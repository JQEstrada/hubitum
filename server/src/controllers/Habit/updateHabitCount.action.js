const { Habit, HabitDate } = require('../../../models'); // Adjust the path according to your project structure
const { updateHabitStreak } = require('./updateHabitStreak.action'); // Import the updateHabitStreak function

module.exports = {
    async habitUpdatecount(req, res) {
        try {
            const countDiff = req.body.count - req.body.initialCount;

            const habitDateRecord = await HabitDate.findOne({
                where: {
                    habitId: req.body.habitDateId,
                    date: new Date(req.body.date)
                }
            });

            if (!habitDateRecord) {
                return res.status(204).send(); // no content
            }

            const habitRecord = await Habit.findOne({ where: { id: habitDateRecord.habitId } });

            if (!habitRecord) {
                return res.status(204).send(); // no content
            }

            if (habitRecord.userId != req.userId) {
                return res.status(401).send(); // unauthorized
            }

            const newData = { unitsDone: habitDateRecord.unitsDone + countDiff };
            await habitDateRecord.update(newData);

            // Update the streak
            await updateHabitStreak({ params: { habitId: habitRecord.id } });

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

