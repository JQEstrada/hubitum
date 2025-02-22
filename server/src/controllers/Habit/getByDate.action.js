const { habit, habitdate, frequencytype } = require('../../../models'); // Adjust the path according to your project structure
const { Dates } = require('../../utils');
const { Op } = require("sequelize");

module.exports = {

    async getByDate (req, res) {
        
        const { date } = req.params;
        const formattedDate = new Date(date).toISOString().split('T')[0]; // Format the date to ISO format
        const formattedDateObj = new Date(formattedDate); // Create a Date object from the formatted date
        const formattedDateLastDay = new Date(formattedDateObj);
        formattedDateLastDay.setDate(formattedDateObj.getDate() - 1);
        const formattedDateLastDayISO = formattedDateLastDay.toISOString().split('T')[0]; // Format the previous day to ISO format

        try {

            const frequencies = await frequencytype.findAll()
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
            const dayHabits = await habit.findAll({
                include: [
                    {
                        model: habitdate,
                        where: {                            
                            date: {
                                [Op.in]: [formattedDate, formattedDateLastDayISO] // Use the formatted dates
                            }
                        },
                        required: true,
                        order: [['date', 'DESC']]
                    }
                ],
                where: {
                    frequencytypeid: dailyFrequencyType.id,
                    isactive: true,
                    userid: req.userId
                }
            })

            // Weekly habits

            const weekMonday = Dates.getWeekMondayFromDay(formattedDate); // Use the formatted date
            const sunday = new Date(weekMonday);
            sunday.setDate(weekMonday.getDate() + 6);

            const weekHabits = await habit.findAll({
                include: [
                    {
                        model: habitdate,
                        where: {
                            date: {
                            [Op.between]: [weekMonday, sunday]
                            }
                        },
                        required: true
                    }
                ],
                where: {
                    frequencytypeid: weeklyFrequencyType.id,
                    isactive: true,
                    userid: req.userId
                }
            })

            // Montlhy habits
            const firstDayOfMonth = new Date(new Date(formattedDate).getFullYear(), new Date(formattedDate).getMonth(), 1);
            const lastDayOfMonth = new Date(new Date(formattedDate).getFullYear(), new Date(formattedDate).getMonth() + 1, 0);

            const monthHabits = await habit.findAll({
                include: [
                    {
                        model: habitdate,
                        where: {
                            date: {
                            [Op.between]: [firstDayOfMonth, lastDayOfMonth]
                            }
                        },
                        required: true
                    }
                ],
                where: {
                    frequencytypeid: monthlyFrequencyType.id,
                    isactive: true,
                    userid: req.userId
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