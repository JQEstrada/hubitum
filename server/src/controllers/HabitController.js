const { sequelize, Habit, HabitDate, FrequencyType } = require('../../models'); // Adjust the path according to your project structure
const { Sequelize } = require('sequelize'); // Import Sequelize

module.exports = {
    async create (req, res) {
        try {

            const habitRecord = await Habit.create({
                ...req.body, 
                userId: req.userId 
            });
            const habitJSON = habitRecord.toJSON()
            const habitDate = new Date(habitRecord.startDate)

            // If habit's start date is today, create HabitDate record
            if(habitDate.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)) {
                const habitDate = await HabitDate.create({
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
                message = 'Error when trying to create habit.'
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
    async updateHabitDateListForUser(req, res) {
        try {

            const curDate = new Date()
            const userId = 1
            // Fetch all active habits with latest associated date
            const activeHabitList = await sequelize.query(
                `SELECT h.*, hd.*
                FROM Habits h
                LEFT JOIN HabitDates hd ON h.id = hd.habitId
                WHERE h.isActive = 1
                  AND hd.date = (
                      SELECT MAX(date)
                      FROM HabitDates
                      WHERE habitId = h.id
                  );`,            
                { type: Sequelize.QueryTypes.SELECT });

            // TO DO! update Habit Dates

            let list = []
            activeHabitList.forEach(element => {
                list.push(element)
            });
            res.status(200).send({
                list: list
            })

        } catch(err) {
            
            res.status(500).send({
                error: 'Error while trying to get habits.'
            })

        }
    }
}