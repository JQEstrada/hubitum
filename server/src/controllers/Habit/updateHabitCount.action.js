const { habit, habitdate } = require('../../../models'); // Adjust the path according to your project structure
const { updateHabitStreak } = require('./updateHabitStreak.action'); // Import the updateHabitStreak function

module.exports = {
    async habitUpdatecount(req, res) {
        try {
            const countDiff = req.body.count - req.body.initialCount;

            const habitDateRecord = await habitdate.findOne({
                where: {
                    habitid: req.body.habitDateId,
                    date: new Date(req.body.date)
                }
            });

            if (!habitDateRecord) {
                return res.status(204).send(); // no content
            }

            const habitRecord = await habit.findOne({ where: { id: habitDateRecord.habitId } });

            if (!habitRecord) {
                return res.status(204).send(); // no content
            }

            if (habitRecord.userid != req.userId) {
                return res.status(401).send(); // unauthorized
            }

            const newData = { unitsdone: habitDateRecord.unitsdone + countDiff };
            await habitDateRecord.update(newData);

            // Update the streak
            await updateHabitStreak({ params: { habitid: habitRecord.id } });

            const habitDateJSON = habitDateRecord.toJSON();

            res.send({
                habitDateRecord: habitDateJSON
            });
        } catch (err) {
            console.log(err);
            let message = "";
            if (err.hasOwnProperty("errors")) {
                message = err.errors[0].message;
            } else {
                message = 'Error when trying to update habit count.';
            }

            res.status(400).send({
                error: message
            });
        }
    }
};

