const { sequelize, Habit, HabitDate } = require('../../../models'); // Adjust the path according to your project structure
const { Sequelize } = require('sequelize'); // Import Sequelize
const { Dates } = require('../../utils');
const { Op } = require("sequelize");

async function createHabitDateWithRetry(data, options, retries = 5, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await HabitDate.create(data, options);
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
                    h.id habitId, 
                    hd.id habitDateId, 
                    h.startDate habitStartDate, 
                    hd.date habitDate, 
                    h.streak habitStreak, 
                    h.goal habitGoal, 
                    hd.unitsDone habitLastUnitsDone,
                    ft.name frequencyTypeName 
                FROM Habits h
                LEFT JOIN HabitDates hd ON h.id = hd.habitId
                LEFT JOIN FrequencyTypes ft ON h.frequencyTypeId = ft.id
                WHERE h.isActive = 1 AND h.userId = ${req.userId}
                  AND 
                    (
                        hd.id IS NULL OR
                        (
                            hd.date <> CURRENT_DATE
                            AND hd.date = (
                                SELECT MAX(date)
                                FROM HabitDates
                                WHERE habitId = h.id
                            )
                        )                       
                    );`,            
                { type: Sequelize.QueryTypes.SELECT });

            // For each habit, create all Habit Dates from last habit date present to current date
            let totalCreations = 0
            for (const element of activeHabitList) {

                const lastRegisteredDate = element.habitDate == null ? null : new Date(element.habitDate)               
                const firstDateToRegister = lastRegisteredDate == null ? new Date(element.habitStartDate) : new Date(lastRegisteredDate.setDate(lastRegisteredDate.getDate() + 1))

                let iterateDate = Dates.getOldestDatePossible(firstDateToRegister)
                const maxIterations = 366 // Prevent more than one year of days on habit creation
                let currentIteration = 1

                // If daily habit was registered until yesterday, or weekly habit and current day is monday, update streak
                if(
                    (element.frequencyTypeName == "Daily" && new Date(firstDateToRegister).toDateString() == new Date().toDateString())
                    ||
                    (element.frequencyTypeName == "Weekly" && new Date(firstDateToRegister).getDay() == 1)
                    ||
                    (element.frequencyTypeName == "Monthly" && new Date(firstDateToRegister).getDate() == 1)
                ) { 

                    let lastUnitsDone = 0

                    if(element.frequencyTypeName == "Daily") {
                        lastUnitsDone = element.habitLastUnitsDone
                    }

                    if(element.frequencyTypeName == "Weekly") {

                        const lastMonthFirstDay = new Date(firstDateToRegister).setDate(new Date(firstDateToRegister).getDate() - 7)
                        const lastMonthLastDay = new Date(firstDateToRegister).setDate(new Date(firstDateToRegister).getDate() - 1)
            
                        const weekHabits = await HabitDate.findAll({
                            where: {
                                habitId: element.habitId,
                                date: {
                                    [Op.between]: [lastWeekMonday, lastWeekSunday]
                                }
                            }
                        })
                        
                        lastUnitsDone = weekHabits.reduce((sum, item) => sum + item.unitsDone, 0);

                    }

                    if(element.frequencyTypeName == "Monthly") {

                        const lastMonthFirstDay = Dates.getWsubtractMonth(Date(firstDateToRegister), 1)
                        const lastMonthLastDay = new Date(firstDateToRegister).setDate(new Date(firstDateToRegister).getDate() - 1)
            
                        const monthHabits = await HabitDate.findAll({
                            where: {
                                habitId: element.habitId,
                                date: {
                                    [Op.between]: [lastMonthFirstDay, lastMonthLastDay]
                                }
                            }
                        })
                        
                        lastUnitsDone = monthHabits.reduce((sum, item) => sum + item.unitsDone, 0);

                    }

        
                    // If habit streak didn't exist or was interrupted, write 1. Else, increment streak
                    const newStreak = element.habitStreak == null ? 1 : (lastUnitsDone >= element.habitGoal ? element.habitStreak + 1 : 1)
                    const newData = { streak: newStreak }        
                    const habitRecord = await Habit.findOne({
                        where: {
                            id: element.habitId
                        }
                    });

                    await habitRecord.update(newData)

                }

                // Create all needed habit dates in batches
                while(iterateDate <= currentDate && currentIteration < maxIterations) {

                    const transaction = await sequelize.transaction(); // Start a new transaction for each batch

                    try {
                        await createHabitDateWithRetry({
                            isDone: false,
                            date: iterateDate,
                            habitId: element.habitId
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
                error: 'Error while trying to create dates.'
            })

        }
    }

}