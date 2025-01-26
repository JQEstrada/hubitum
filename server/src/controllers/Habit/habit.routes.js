const authMiddleware = require('../../middleware/authMiddleware');
const createAction = require('./create.action')
const getAllAction = require('./getAll.action')
const getByDateAction = require('./getByDate.action')
const getFrequentyTypesAction = require('./getFrequencyTypes.action')
const getOneAction = require('./getOne.action')
const getUnitsAction = require('./getUnits.action')
const getUnitTypesAction = require('./getUnitTypes.action')
const saveAction = require('./save.action')
const updateHabitCountAction = require('./updateHabitCount.action')
const updateHabitDateListForUserAction = require('./updateHabitDateListForUser.action')
const updateHabitStreakAction = require('./updateHabitStreak.action')

module.exports = (app) => {
    app.post(
        '/habit-create',
        authMiddleware,
        createAction.create
      ),
      app.post(
        '/habit-save',
        authMiddleware,
        saveAction.save
      ),
      app.get(
        '/habit-getall',
        getAllAction.index
      ),
      app.get(
        '/habit-getbydate/:date',
        authMiddleware,
        getByDateAction.getByDate
      ),
      app.get(
        '/habit-getone/:id',
        getOneAction.getOne
      ),
      app.get(
        '/habit-getfrequencies',
        getFrequentyTypesAction.getFrequencyTypeList
      ),
      app.get(
        '/habit-getunittypes',
        getUnitTypesAction.getUnitTypeList
      ),
      app.get(
        '/habit-getunits',
        getUnitsAction.getUnitList
      ),
      app.post(
        '/habit-updateHabitDateListForUser',
        authMiddleware,
        updateHabitDateListForUserAction.updateHabitDateListForUser
      ),
      app.post(
        '/habit-updatecount',
        authMiddleware,
        updateHabitCountAction.habitUpdatecount
      ),
      app.post(
        '/habit-update-streak',
        authMiddleware,
        updateHabitStreakAction.updateHabitStreak
      )
}