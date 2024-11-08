const { sequelize, Habit, HabitDate, FrequencyType, Unit, UnitType } = require('../../models'); // Adjust the path according to your project structure
const { Sequelize } = require('sequelize'); // Import Sequelize
const { Dates } = require('../utils');
const { OPEN_READWRITE } = require('sqlite3');

module.exports = {
    async save (req, res) {
        try {

            const habitRecord = await Habit.findOne({ where: { id: req.body.id } })
            await habitRecord.update(req.body)
            const habitJSON = habitRecord.toJSON()
            res.send(
                {
                    habitRecord: habitJSON
                }
            );
        } catch (err) {
            console.log(err)
            let message = ""
            if(err.hasOwnProperty("errors")) {
                message = err.errors[0].message
            } else {
                message = 'Error when trying to update habit.'
            }
                
            res.status(400).send({
                error: message
            })
        }

    },
    async create (req, res) {
        try {

            const habitRecord = await Habit.create({
                ...req.body, 
                userId: req.userId 
            });
            const habitJSON = habitRecord.toJSON()
            const habitStartDate = new Date(habitRecord.startDate)

            // If habit's start date is today, create HabitDate record
            if(habitStartDate.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)) {
                const habitDateRecord = await HabitDate.create({
                    isDone: false,
                    date: new Date().setHours(0, 0, 0, 0),
                    habitId: habitRecord.id
                })
            }
            res.send(
                {
                    habitRecord: habitJSON
                }
            );
        } catch (err) {

            let message = ""
            if(err.hasOwnProperty("errors")) {
                message = err.errors[0].message
            } else {
                message = 'Error when trying to update habit.'
            }
                
            res.status(400).send({
                error: message
            })
        }

    },
    async index (req, res) {
        try {
            
            const habits = await sequelize.query("SELECT * FROM Habits WHERE isActive = 1", { type: Sequelize.QueryTypes.SELECT });
          
            res.json(habits)

        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'Error while trying get habit list.'
            })
        }

    },  
    async getByDate (req, res) {
      
        const {date} = req.params;

        try {

            if(req.userId == null) {
                res.status(401)
            }

            if(isNaN(new Date(date))) {
                res.status(400).send({
                    error: "Invalid date."
                })
            }

            const habits = await Habit.findAll({
                include: [
                    {
                        model: HabitDate,
                        where: {
                            date: date
                        },
                        required: true
                    }
                ],
                where: {
                    isActive: true,
                    userId: req.userId
                }
            })

            res.json(habits)

        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'Error while trying get habit list.'
            })
        }

    },
    async getOne (req, res) {
        try {            
            const {id} = req.params;

            //const habit = await sequelize.query("SELECT * FROM Habits WHERE Id = ", { type: Sequelize.QueryTypes.SELECT });
            const habit = await Habit.findOne({
                where: {
                  id: id,  // Automatically sanitized by Sequelize
                },
              });
            res.json(habit)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'Error while trying to get habit.'
            })
        }
    },
    async getFrequencyTypeList (req, res) {
        try {            

            const frequencies = await FrequencyType.findAll()
            res.json(frequencies)

        } catch (err) {
            
            res.status(500).send({
                error: 'Error while trying to get frequency types.'
            })

        }
    },
    async getUnitTypeList (req, res) {
        try {            

            const unitTypes = await UnitType.findAll()
            res.json(unitTypes)

        } catch (err) {
            
            res.status(500).send({
                error: 'Error while trying to get unit types.'
            })

        }
    },
    async getUnitList (req, res) {
        try {            

            const units = await Unit.findAll()
            res.json(units)

        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'Error while trying to get units.'
            })

        }
    },
    async updateHabitDateListForUser(req, res) {
        console.log("TESTE")
        try {
            console.log(req.userId)

            if(typeof req.userId == "undefined") {
                res.status(401)
            }

            const currentDate = new Date();
            
            // Fetch all active habits that don't have current date's HabitDate, with latest associated date
            const activeHabitList = await sequelize.query(
                `SELECT h.id habitId, hd.id habitDateId, h.startDate habitStartDate, hd.date  habitDate 
                FROM Habits h
                LEFT JOIN HabitDates hd ON h.id = hd.habitId
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

                while(iterateDate <= currentDate && currentIteration < maxIterations) {

                    await HabitDate.create({
                        isDone: false,
                        date: iterateDate,
                        habitId: element.habitId
                    })
                    
                    currentIteration = currentIteration + 1
                    totalCreations = totalCreations + 1
                    iterateDate.setDate(iterateDate.getDate() + 1);
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
    },
    async habitUpdatecount (req, res) {
        try {

            const habitDateRecord = await HabitDate.findOne({
                where: {
                    id: req.body.habitDateId
                }
            });
            
            if(habitDateRecord.id == null) {
                res.status(204) // no content
            }

            const habitRecord = await Habit.findOne({ where: { id: habitDateRecord.habitId } })


            if(habitRecord.id == null) {
                res.status(204) // no content
            }

            if(habitRecord.userId != req.userId) {
                res.status(401)
            }

            const newData = { unitsDone: req.body.count }
            await habitDateRecord.update(newData)

            const habitDateJSON = habitDateRecord.toJSON()
            
            res.send(
                {
                    habitDateRecord: habitDateJSON
                }
            );
        } catch (err) {
            console.log(err)
            let message = ""
            if(err.hasOwnProperty("errors")) {
                message = err.errors[0].message
            } else {
                message = 'Error when trying to update habit count.'
            }
                
            res.status(400).send({
                error: message
            })
        }

    }
}