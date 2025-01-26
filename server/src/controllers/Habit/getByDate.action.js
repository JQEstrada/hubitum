const { Habit, HabitDate, FrequencyType } = require('../../../models'); // Adjust the path according to your project structure
const { Dates } = require('../../utils');
const { Op } = require("sequelize");

module.exports = {

    async getByDate (req, res) {
        
        const {date} = req.params;
        const formattedDate = new Date(date).toISOString().split('T')[0]; // Format the date to ISO format

        try {

            const frequencies = await FrequencyType.findAll()
            const dailyFrequencyType = frequencies.find(frequency => frequency.name == "Daily" )
            const weeklyFrequencyType = frequencies.find(frequency => frequency.name == "Weekly" )
            const monthlyFrequencyType = frequencies.find(frequency => frequency.name == "Monthly" )

            if(req.userId == null) {
                res.status(401)
            }

            if(isNaN(new Date(date))) {
                res.status(400).send({
                    error: "Invalid date."
                })
            }
            // Daily habits
            const dayHabits = await Habit.findAll({
                include: [
                    {
                        model: HabitDate,
                        where: {
                            date: formattedDate // Use the formatted date
                        },
                        required: true
                    }
                ],
                where: {
                    frequencyTypeId: dailyFrequencyType.id,
                    isActive: true,
                    userId: req.userId
                }
            })

            // Weekly habits

            const weekMonday = Dates.getWeekMondayFromDay(formattedDate); // Use the formatted date
            const sunday = new Date(weekMonday);
            sunday.setDate(weekMonday.getDate() + 6);

            const weekHabits = await Habit.findAll({
                include: [
                    {
                        model: HabitDate,
                        where: {
                            date: {
                            [Op.between]: [weekMonday, sunday]
                            }
                        },
                        required: true
                    }
                ],
                where: {
                    frequencyTypeId: weeklyFrequencyType.id,
                    isActive: true,
                    userId: req.userId
                }
            })

            // Montlhy habits
            const firstDayOfMonth = new Date(new Date(formattedDate).getFullYear(), new Date(formattedDate).getMonth(), 1);
            const lastDayOfMonth = new Date(new Date(formattedDate).getFullYear(), new Date(formattedDate).getMonth() + 1, 0);

            const monthHabits = await Habit.findAll({
                include: [
                    {
                        model: HabitDate,
                        where: {
                            date: {
                            [Op.between]: [firstDayOfMonth, lastDayOfMonth]
                            }
                        },
                        required: true
                    }
                ],
                where: {
                    frequencyTypeId: monthlyFrequencyType.id,
                    isActive: true,
                    userId: req.userId
                }
            })

            const habits = dayHabits.concat(weekHabits, monthHabits)

            res.json(habits)

        } catch (err) {
            console.log("ERROR!")
            console.log(err)
            res.status(500).send({
                error: 'Error while trying get habit list.'
            })
        }

    }

}