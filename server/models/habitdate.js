'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HabitDate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HabitDate.belongsTo(models.Habit, {
        foreignKey: 'habitId'
      });
    }
  }
  HabitDate.init({
    isDone: DataTypes.BOOLEAN,
    date: DataTypes.DATEONLY,
    unitsDone: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HabitDate',
  });
  return HabitDate;
};