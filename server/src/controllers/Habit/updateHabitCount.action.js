const {  Habit, HabitDate } = require('../../../models'); // Adjust the path according to your project structure

module.exports = {


    async habitUpdatecount (req, res) {
        try {
            
            const countDiff = req.body.count - req.body.initialCount

            const habitDateRecord = await HabitDate.findOne({
                where: {
                    habitId: req.body.habitDateId,
                    date: new Date(req.body.date)
                }
            });

            if(habitDateRecord.id == null) {
                res.status(204) // no content
            }

            const habitRecord = await Habit.findOne({ where: { id: habitDateRecord.habitId} })


            if(habitRecord.id == null) {
                res.status(204) // no content
            }

            if(habitRecord.userId != req.userId) {
                res.status(401)
            }

            const newData = { unitsDone: habitDateRecord.unitsDone + countDiff }
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

