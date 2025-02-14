const { habit, habitdate } = require('../../../models'); // Adjust the path according to your project structure

module.exports = {

    async create (req, res) {
        try {

            const habitRecord = await habit.create({
                ...req.body, 
                userid: req.userId 
            });
            const habitJSON = habitRecord.toJSON()
            const habitStartDate = new Date(habitRecord.startdate)

            // If habit's start date is today, create HabitDate record
            if(habitStartDate.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)) {
                const habitDateRecord = await habitdate.create({
                    isdone: false,
                    date: new Date().setHours(0, 0, 0, 0),
                    habitid: habitRecord.id
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
                message = 'Error when trying to update habit. ' + err
            }
                
            res.status(400).send({
                error: message
            })
        }

    }

}