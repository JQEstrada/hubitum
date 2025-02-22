const { habit, habitdate } = require('../../../models'); // Adjust the path according to your project structure
const { Op } = require("sequelize");

module.exports = {
    async updateHabitStreak(req, res) {
        try {
            const { habitid } = req.params;

            // Fetch the habit
            const habitRec = await habit.findOne({ where: { id: habitid } });
            if (!habitRec) {
                return res.status(404).send({ error: 'Habit not found' });
            }

            // Fetch all HabitDates for the habit
            const habitDates = await habitdate.findAll({
                where: {
                    habitid: habitid,
                    date: {
                        [Op.lte]: new Date()
                    },
                    unitsdone: {
                        [Op.gte]: habitRec.goal
                    }
                },
                order: [['date', 'DESC']]
            });

            // Calculate the streak
            let streak = 0;
            let currentDate = new Date();
            for (const habitDate of habitDates) {
                const habitDateObj = new Date(habitDate.date);
                if (habitDateObj.toDateString() === currentDate.toDateString()) {
                    streak++;
                    currentDate.setDate(currentDate.getDate() - 1);
                } else {
                    break;
                }
            }

            // Update the habit's streak
            await habitRec.update({ streak });

            if (res && typeof res.status === 'function') {
                res.status(200).send({ streak });
            }
        } catch (err) {
            console.log(err);
            if (res && typeof res.status === 'function') {
                res.status(500).send({ error: 'Error while trying to update streak.' });
            }
        }
    }
};
