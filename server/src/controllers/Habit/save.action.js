const { Habit } = require('../../../models'); // Adjust the path according to your project structure

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