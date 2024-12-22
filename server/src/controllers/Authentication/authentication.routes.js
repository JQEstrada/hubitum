const AuthenticationControllerPolicy = require('../../policies/AuthenticationControllerPolicy')
const AuthenticationController = require('./AuthenticationController')

module.exports = (app) => {

    app.post(
        '/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register
      ),
      app.post(
        '/login',
        AuthenticationController.login
      )

}