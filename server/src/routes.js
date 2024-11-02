const AuthenticationController = require('./controllers/AuthenticationController')
const HabitController = require('./controllers/HabitController')
const authMiddleware = require('./middleware/authMiddleware');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  app.post(
    '/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  ),
  app.post(
    '/login',
    AuthenticationController.login
  ),
  app.post(
    '/habit-create',
    authMiddleware,
    HabitController.create
  ),
  app.post(
    '/habit-save',
    authMiddleware,
    HabitController.save
  ),
  app.get(
    '/habit-getall',
    HabitController.index
  ),
  app.get(
    '/habit-getbydate/:date',
    HabitController.getByDate
  ),
  app.get(
    '/habit-getone/:id',
    HabitController.getOne
  ),
  app.get(
    '/habit-getfrequencies',
    HabitController.getFrequencyTypeList
  ),
  app.get(
    '/habit-getunittypes',
    HabitController.getUnitTypeList
  ),
  app.get(
    '/habit-getunits',
    HabitController.getUnitList
  ),
  app.post(
    '/habit-updateHabitDateListForUser',
    HabitController.updateHabitDateListForUser
  )
}