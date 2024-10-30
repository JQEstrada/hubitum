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
  app.get(
    '/habit-getall',
    HabitController.index
  ),
  app.get(
    '/habit-getone/:id',
    HabitController.getOne
  ),
  app.get(
    '/habit-getfrequencies',
    HabitController.getFrequencyTypeList
  ),
  app.post(
    '/habit-updateHabitDateListForUser',
    HabitController.updateHabitDateListForUser
  )
}