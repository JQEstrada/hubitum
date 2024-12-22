// const { sequelize, Habit, HabitDate, FrequencyType, Unit, UnitType } = require('../../models'); // Adjust the path according to your project structure
// const { Sequelize } = require('sequelize'); // Import Sequelize
// const { Dates } = require('../utils');
// const { Op } = require("sequelize");

module.exports = {
    // async save (req, res) {
    //     try {

    //         const habitRecord = await Habit.findOne({ where: { id: req.body.id } })
    //         await habitRecord.update(req.body)
    //         const habitJSON = habitRecord.toJSON()
    //         res.send(
    //             {
    //                 habitRecord: habitJSON
    //             }
    //         );
    //     } catch (err) {
    //         console.log(err)
    //         let message = ""
    //         if(err.hasOwnProperty("errors")) {
    //             message = err.errors[0].message
    //         } else {
    //             message = 'Error when trying to update habit.'
    //         }
                
    //         res.status(400).send({
    //             error: message
    //         })
    //     }

    // },
    // async create (req, res) {
    //     try {

    //         const habitRecord = await Habit.create({
    //             ...req.body, 
    //             userId: req.userId 
    //         });
    //         const habitJSON = habitRecord.toJSON()
    //         const habitStartDate = new Date(habitRecord.startDate)

    //         // If habit's start date is today, create HabitDate record
    //         if(habitStartDate.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)) {
    //             const habitDateRecord = await HabitDate.create({
    //                 isDone: false,
    //                 date: new Date().setHours(0, 0, 0, 0),
    //                 habitId: habitRecord.id
    //             })
    //         }
    //         res.send(
    //             {
    //                 habitRecord: habitJSON
    //             }
    //         );
    //     } catch (err) {

    //         let message = ""
    //         if(err.hasOwnProperty("errors")) {
    //             message = err.errors[0].message
    //         } else {
    //             message = 'Error when trying to update habit.'
    //         }
                
    //         res.status(400).send({
    //             error: message
    //         })
    //     }

    // },
    // async index (req, res) {
    //     try {
            
    //         const habits = await sequelize.query("SELECT * FROM Habits WHERE isActive = 1", { type: Sequelize.QueryTypes.SELECT });
          
    //         res.json(habits)

    //     } catch (err) {
    //         console.log(err)
    //         res.status(500).send({
    //             error: 'Error while trying get habit list.'
    //         })
    //     }

    // },  
    // async getByDate (req, res) {
        
    //     const {date} = req.params;

    //     try {

    //         const frequencies = await FrequencyType.findAll()
    //         const dailyFrequencyType = frequencies.find(frequency => frequency.name == "Daily" )
    //         const weeklyFrequencyType = frequencies.find(frequency => frequency.name == "Weekly" )
    //         const monthlyFrequencyType = frequencies.find(frequency => frequency.name == "Monthly" )

    //         if(req.userId == null) {
    //             res.status(401)
    //         }

    //         if(isNaN(new Date(date))) {
    //             res.status(400).send({
    //                 error: "Invalid date."
    //             })
    //         }

    //         // Daily habits
    //         const dayHabits = await Habit.findAll({
    //             include: [
    //                 {
    //                     model: HabitDate,
    //                     where: {
    //                         date: date
    //                     },
    //                     required: true
    //                 }
    //             ],
    //             where: {
    //                 frequencyTypeId: dailyFrequencyType.id,
    //                 isActive: true,
    //                 userId: req.userId
    //             }
    //         })

    //         // Weekly habits

    //         const weekMonday = Dates.getWeekMondayFromDay(date)
    //         const sunday = new Date(weekMonday);
    //         sunday.setDate(weekMonday.getDate() + 6);

    //         const weekHabits = await Habit.findAll({
    //             include: [
    //                 {
    //                     model: HabitDate,
    //                     where: {
    //                         date: {
    //                         [Op.between]: [weekMonday, sunday]
    //                         }
    //                     },
    //                     required: true
    //                 }
    //             ],
    //             where: {
    //                 frequencyTypeId: weeklyFrequencyType.id,
    //                 isActive: true,
    //                 userId: req.userId
    //             }
    //         })

    //         // Montlhy habits
    //         const firstDayOfMonth = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 1);
    //         const lastDayOfMonth = new Date(new Date(date).getFullYear(), new Date(date).getMonth() + 1, 0);

    //         const monthHabits = await Habit.findAll({
    //             include: [
    //                 {
    //                     model: HabitDate,
    //                     where: {
    //                         date: {
    //                         [Op.between]: [firstDayOfMonth, lastDayOfMonth]
    //                         }
    //                     },
    //                     required: true
    //                 }
    //             ],
    //             where: {
    //                 frequencyTypeId: monthlyFrequencyType.id,
    //                 isActive: true,
    //                 userId: req.userId
    //             }
    //         })

    //         const habits = dayHabits.concat(weekHabits, monthHabits)

    //         res.json(habits)

    //     } catch (err) {
    //         console.log("ERROR!")
    //         console.log(err)
    //         res.status(500).send({
    //             error: 'Error while trying get habit list.'
    //         })
    //     }

    // },
    // async getOne (req, res) {
    //     try {            
    //         const {id} = req.params;

    //         //const habit = await sequelize.query("SELECT * FROM Habits WHERE Id = ", { type: Sequelize.QueryTypes.SELECT });
    //         const habit = await Habit.findOne({
    //             where: {
    //               id: id,  // Automatically sanitized by Sequelize
    //             },
    //           });
    //         res.json(habit)
    //     } catch (err) {
    //         console.log(err)
    //         res.status(500).send({
    //             error: 'Error while trying to get habit.'
    //         })
    //     }
    // },
    // async getFrequencyTypeList (req, res) {
    //     try {            

    //         const frequencies = await FrequencyType.findAll()
    //         res.json(frequencies)

    //     } catch (err) {
            
    //         res.status(500).send({
    //             error: 'Error while trying to get frequency types.'
    //         })

    //     }
    // },
    // async getUnitTypeList (req, res) {
    //     try {            

    //         const unitTypes = await UnitType.findAll()
    //         res.json(unitTypes)

    //     } catch (err) {
            
    //         res.status(500).send({
    //             error: 'Error while trying to get unit types.'
    //         })

    //     }
    // },
    // async getUnitList (req, res) {
    //     try {            

    //         const units = await Unit.findAll()
    //         res.json(units)

    //     } catch (err) {
    //         console.log(err)
    //         res.status(500).send({
    //             error: 'Error while trying to get units.'
    //         })

    //     }
    // },
    // async updateHabitDateListForUser(req, res) {

    //     try {

    //         if(typeof req.userId == "undefined") {
    //             res.status(401)
    //         }

    //         const currentDate = new Date();

    //         // Fetch all active habits that don't have current date's HabitDate, with latest associated date
    //         const activeHabitList = await sequelize.query(
    //             `SELECT 
    //                 h.id habitId, 
    //                 hd.id habitDateId, 
    //                 h.startDate habitStartDate, 
    //                 hd.date habitDate, 
    //                 h.streak habitStreak, 
    //                 h.goal habitGoal, 
    //                 hd.unitsDone habitLastUnitsDone,
    //                 ft.name frequencyTypeName 
    //             FROM Habits h
    //             LEFT JOIN HabitDates hd ON h.id = hd.habitId
    //             LEFT JOIN FrequencyTypes ft ON h.frequencyTypeId = ft.id
    //             WHERE h.isActive = 1 AND h.userId = ${req.userId}
    //               AND 
    //                 (
    //                     hd.id IS NULL OR
    //                     (
    //                         hd.date <> CURRENT_DATE
    //                         AND hd.date = (
    //                             SELECT MAX(date)
    //                             FROM HabitDates
    //                             WHERE habitId = h.id
    //                         )
    //                     )                       
    //                 );`,            
    //             { type: Sequelize.QueryTypes.SELECT });
                
    //         // For each habit, create all Habit Dates from last habit date present to current date
    //         let totalCreations = 0
    //         for (const element of activeHabitList) {

    //             const lastRegisteredDate = element.habitDate == null ? null : new Date(element.habitDate)               
    //             const firstDateToRegister = lastRegisteredDate == null ? new Date(element.habitStartDate) : new Date(lastRegisteredDate.setDate(lastRegisteredDate.getDate() + 1))

    //             let iterateDate = Dates.getOldestDatePossible(firstDateToRegister)
    //             const maxIterations = 366 // Prevent more than one year of days on habit creation
    //             let currentIteration = 1

    //             // If daily habit was registered until yesterday, or weekly habit and current day is monday, update streak
    //             if(
    //                 (element.frequencyTypeName == "Daily" && new Date(firstDateToRegister).toDateString() == new Date().toDateString())
    //                 ||
    //                 (element.frequencyTypeName == "Weekly" && new Date(firstDateToRegister).getDay() == 1)
    //                 ||
    //                 (element.frequencyTypeName == "Monthly" && new Date(firstDateToRegister).getDate() == 1)
    //             ) { 

    //                 let lastUnitsDone = 0

    //                 if(element.frequencyTypeName == "Daily") {
    //                     lastUnitsDone = element.habitLastUnitsDone
    //                 }

    //                 if(element.frequencyTypeName == "Weekly") {

    //                     const lastMonthFirstDay = new Date(firstDateToRegister).setDate(new Date(firstDateToRegister).getDate() - 7)
    //                     const lastMonthLastDay = new Date(firstDateToRegister).setDate(new Date(firstDateToRegister).getDate() - 1)
            
    //                     const weekHabits = await HabitDate.findAll({
    //                         where: {
    //                             habitId: element.habitId,
    //                             date: {
    //                                 [Op.between]: [lastWeekMonday, lastWeekSunday]
    //                             }
    //                         }
    //                     })
                        
    //                     lastUnitsDone = weekHabits.reduce((sum, item) => sum + item.unitsDone, 0);

    //                 }

    //                 if(element.frequencyTypeName == "Monthly") {

    //                     const lastMonthFirstDay = Dates.getWsubtractMonth(Date(firstDateToRegister), 1)
    //                     const lastMonthLastDay = new Date(firstDateToRegister).setDate(new Date(firstDateToRegister).getDate() - 1)
            
    //                     const monthHabits = await HabitDate.findAll({
    //                         where: {
    //                             habitId: element.habitId,
    //                             date: {
    //                                 [Op.between]: [lastMonthFirstDay, lastMonthLastDay]
    //                             }
    //                         }
    //                     })
                        
    //                     lastUnitsDone = monthHabits.reduce((sum, item) => sum + item.unitsDone, 0);

    //                 }

        
    //                 // If habit streak didn't exist or was interrupted, write 1. Else, increment streak
    //                 const newStreak = element.habitStreak == null ? 1 : (lastUnitsDone >= element.habitGoal ? element.habitStreak + 1 : 1)
    //                 const newData = { streak: newStreak }        
    //                 const habitRecord = await Habit.findOne({
    //                     where: {
    //                         id: element.habitId
    //                     }
    //                 });

    //                 await habitRecord.update(newData)

    //             }

    //             // Create all needed habit dates
    //             while(iterateDate <= currentDate && currentIteration < maxIterations) {

    //                 await HabitDate.create({
    //                     isDone: false,
    //                     date: iterateDate,
    //                     habitId: element.habitId
    //                 })
                    
    //                 currentIteration = currentIteration + 1
    //                 totalCreations = totalCreations + 1
    //                 iterateDate.setDate(iterateDate.getDate() + 1)

    //             }

    //         }
    //         res.status(200).send({
    //             iterations: totalCreations 
    //         })

    //     } catch(err) {
    //         console.log(err)
    //         res.status(500).send({
    //             error: 'Error while trying to create dates.'
    //         })

    //     }
    // },
    // async habitUpdatecount (req, res) {
    //     try {
            
    //         const countDiff = req.body.count - req.body.initialCount

    //         const habitDateRecord = await HabitDate.findOne({
    //             where: {
    //                 habitId: req.body.habitDateId,
    //                 date: new Date(req.body.date)
    //             }
    //         });

    //         if(habitDateRecord.id == null) {
    //             res.status(204) // no content
    //         }

    //         const habitRecord = await Habit.findOne({ where: { id: habitDateRecord.habitId} })


    //         if(habitRecord.id == null) {
    //             res.status(204) // no content
    //         }

    //         if(habitRecord.userId != req.userId) {
    //             res.status(401)
    //         }

    //         const newData = { unitsDone: habitDateRecord.unitsDone + countDiff }
    //         await habitDateRecord.update(newData)

    //         const habitDateJSON = habitDateRecord.toJSON()
            
    //         res.send(
    //             {
    //                 habitDateRecord: habitDateJSON
    //             }
    //         );
    //     } catch (err) {
    //         console.log(err)
    //         let message = ""
    //         if(err.hasOwnProperty("errors")) {
    //             message = err.errors[0].message
    //         } else {
    //             message = 'Error when trying to update habit count.'
    //         }
                
    //         res.status(400).send({
    //             error: message
    //         })
    //     }

    // }
}