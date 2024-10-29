'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Habit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Habit.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Habit.belongsTo(models.FrequencyType, {
        foreignKey: 'frequencyTypeId'
      });
      Habit.hasMany(models.HabitDate, {
        foreignKey: 'habitId'
      });
    }
  }
  Habit.init({   
    id: {
      type: DataTypes.INTEGER,    // Integer type
      autoIncrement: true,        // Enable auto-increment
      primaryKey: true,           // Set as primary key
      allowNull: false,           // Ensure it's not null
    },
    isActive: DataTypes.BOOLEAN,
    startDate: DataTypes.DATEONLY,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Habit',
  });
  return Habit;
};