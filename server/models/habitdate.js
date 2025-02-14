'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class habitdate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      habitdate.belongsTo(models.habit, {
        foreignKey: 'habitid'
      });
    }
  }
  habitdate.init({
    isdone: DataTypes.BOOLEAN,
    date: DataTypes.DATEONLY,
    unitsdone: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'habitdate',
  });
  return habitdate;
};