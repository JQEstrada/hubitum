const { sequelize, habit, habitdate } = require('../../../models'); // Adjust the path according to your project structure
const { Sequelize } = require('sequelize'); // Import Sequelize
const { Dates } = require('../../utils');
const { Op } = require("sequelize");

async function createHabitDateWithRetry(data, options, retries = 5, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await habitdate.create(data, options);
        } catch (err) {
            if (err.code === 'SQLITE_BUSY' && i < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw err;
            }
        }
    }
}

async function commitTransactionWithRetry(transaction, retries = 5, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            await transaction.commit();
            return;
        } catch (err) {
            if (err.code === 'SQLITE_BUSY' && i < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw err;
            }
        }
    }
}

module.exports = {

    async updateHabitDateListForUser(req, res) {
        
        try {

            if(typeof req.userId == "undefined") {
                res.status(401)
            }

            const currentDate = new Date();

            // Fetch all active habits that don't have current date's HabitDate, with latest associated date
            const activeHabitList = await sequelize.query(
                `SELECT 
                    h.id habitid, 
                    hd.id habitdateid, 
                    h.startdate habitstartdate, 
                    hd.date habitdate, 
                    h.streak habitstreak, 
                    h.goal habitgoal, 
                    hd.unitsdone habitlastunitsdone,
                    ft.name frequencytypename 
                FROM habits h
                LEFT JOIN habitdates hd ON h.id = hd.habitid
                LEFT JOIN frequencytypes ft ON h.frequencytypeid = ft.id
                WHERE h.isactive = TRUE AND h.userid = ${req.userId}
                  AND 
                    (
                        hd.id IS NULL OR
                        (
                            hd.date <> CURRENT_DATE
                            AND hd.date = (
                                SELECT MAX(date)
                                FROM habitdates
                                WHERE habitid = h.id
                            )
                        )                       
                    );`,            
                { type: Sequelize.QueryTypes.SELECT });

            // For each habit, create all Habit Dates from last habit date present to current date
            let totalCreations = 0
            for (const element of activeHabitList) {

                const lastRegisteredDate = element.habitdate == null ? null : new Date(element.habitdate)               
                const firstDateToRegister = lastRegisteredDate == null ? new Date(element.habitstartdate) : new Date(lastRegisteredDate.setDate(lastRegisteredDate.getDate() + 1))

                let iterateDate = Dates.getOldestDatePossible(firstDateToRegister)
                const maxIterations = 366 // Prevent more than one year of days on habit creation
                let currentIteration = 1

                // If daily habit was registered until yesterday, or weekly habit and current day is monday, update streak
                if(
                    (element.frequencytypename == "Daily" && new Date(firstDateToRegister).toDateString() == new Date().toDateString())
                    ||
                    (element.frequencytypename == "Weekly" && new Date(firstDateToRegister).getDay() == 1)
                    ||
                    (element.frequencytypename == "Monthly" && new Date(firstDateToRegister).getDate() == 1)
                ) { 

                    let lastUnitsDone = 0

                    if(element.frequencytypename == "Daily") {
                        lastUnitsDone = element.habitlastunitsdone
                    }

                    if(element.frequencytypename == "Weekly") {

                        const lastMonthFirstDay = new Date(firstDateToRegister).setDate(new Date(firstDateToRegister).getDate() - 7)
                        const lastMonthLastDay = new Date(firstDateToRegister).setDate(new Date(firstDateToRegister).getDate() - 1)
            
                        const weekHabits = await habitdate.findAll({
                            where: {
                                habitid: element.habitid,
                                date: {
                                    [Op.between]: [lastWeekMonday, lastWeekSunday]
                                }
                            }
                        })
                        
                        lastUnitsDone = weekHabits.reduce((sum, item) => sum + item.unitsdone, 0);

                    }

                    if(element.frequencytypename == "Monthly") {

                        const lastMonthFirstDay = Dates.getWsubtractMonth(Date(firstDateToRegister), 1)
                        const lastMonthLastDay = new Date(firstDateToRegister).setDate(new Date(firstDateToRegister).getDate() - 1)
            
                        const monthHabits = await habitdate.findAll({
                            where: {
                                habitid: element.habitid,
                                date: {
                                    [Op.between]: [lastMonthFirstDay, lastMonthLastDay]
                                }
                            }
                        })
                        
                        lastUnitsDone = monthHabits.reduce((sum, item) => sum + item.unitsdone, 0);

                    }

        
                    // If habit streak didn't exist or was interrupted, write 1. Else, increment streak
                    const newStreak = element.habitstreak == null ? 1 : (lastUnitsDone >= element.habitgoal ? element.habitstreak + 1 : 1)
                    const newData = { streak: newStreak }        
                    const habitRecord = await habit.findOne({
                        where: {
                            id: element.habitid
                        }
                    });

                    await habitRecord.update(newData)

                }

                // Create all needed habit dates in batches
                while(iterateDate <= currentDate && currentIteration < maxIterations) {

                    const transaction = await sequelize.transaction(); // Start a new transaction for each batch

                    try {
                        await createHabitDateWithRetry({
                            isdne: false,
                            date: iterateDate,
                            habitid: element.habitid
                        }, { transaction })
                        
                        currentIteration = currentIteration + 1
                        totalCreations = totalCreations + 1
                        iterateDate.setDate(iterateDate.getDate() + 1)

                        await commitTransactionWithRetry(transaction); // Commit the transaction with retry
                    } catch (err) {
                        if (!transaction.finished) {
                            await transaction.rollback(); // Rollback the transaction in case of error
                        }
                        throw err;
                    }

                }

            }

            res.status(200).send({
                iterations: totalCreations 
            })

        } catch(err) {
            console.log(err)
            res.status(500).send({
                error: 'Error while trying to create dates: ' + err
            })

        }
    }

}