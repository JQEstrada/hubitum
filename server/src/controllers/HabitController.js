const { sequelize, Habit, HabitDate, FrequencyType } = require('../../models'); // Adjust the path according to your project structure
const { Sequelize } = require('sequelize'); // Import Sequelize

module.exports = {
    async create (req, res) {
        try {
            //const habitRecord = await sequelize.query(`INSERT INTO Habits (name, createdAt, updatedAt) VALUES('${req.body.name}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`, { type: Sequelize.QueryTypes.SELECT });
console.log(req.body)
            const habitRecord = await Habit.create({
                ...req.body, 
                userId: req.userId 
            });
            const habitDate = await HabitDate.create({
                isDone: false,
                date: new Date().setHours(0, 0, 0, 0),
                habitId: habitRecord.id
            })
            const habitJSON = habitRecord.toJSON()
            res.send(
                {
                    habitRecord: habitJSON
                }
            );
        } catch (err) {
            console.log(err)
            res.status(400).send({
                error: 'Invalid habit.'
            })
        }

    },
    async index (req, res) {
        try {
            
            //const habits = await Habit.findAll()
            const habits = await sequelize.query("SELECT * FROM Habits", { type: Sequelize.QueryTypes.SELECT });
            //console.log(habits); // Log fetched habits
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
            console.log("ID")
            console.log(id)
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
    }
}