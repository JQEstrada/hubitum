const Promise = require('bluebird')
const bcrypt= Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user, options) {
  const SALT_FACTOR = 8

  if(!user.changed('password')) {
    return;
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,    // Integer type
      autoIncrement: true,        // Enable auto-increment
      primaryKey: true,           // Set as primary key
      allowNull: false,           // Ensure it's not null
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: hashPassword
    }
  })

  
  User.prototype.comparePassword = function(password) {
    return bcrypt.compareAsync(password, this.password)
  }

  return User

}