const { Habit, HabitDate } = require('../../../models'); // Adjust the path according to your project structure

module.exports = {

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

    }

}