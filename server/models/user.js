'use strict';
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

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.habit, {
        foreignKey: 'userid'
      });
    }
  }
  user.init({    
    id: {
      type: DataTypes.INTEGER,    // Integer type
      autoIncrement: true,        // Enable auto-increment
      primaryKey: true,           // Set as primary key
      allowNull: false,           // Ensure it's not null
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'users'
  });

  user.beforeSave('hashPassword', (user, options) => {
    return hashPassword(user, options); 
  });

  user.prototype.comparePassword = function(password) {

    bcrypt.compareAsync(password, this.password)

    return bcrypt.compareAsync(password, this.password)
  }


  return user;
};