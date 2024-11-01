'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Unit.belongsTo(models.UnitType, {
        foreignKey: 'unitTypeId'
      });
      Unit.hasMany(models.Habit, {
        foreignKey: 'unitId'
      });
    }
  }
  Unit.init({   
    id: {
      type: DataTypes.INTEGER,    // Integer type
      autoIncrement: true,        // Enable auto-increment
      primaryKey: true,           // Set as primary key
      allowNull: false,           // Ensure it's not null
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    shortName: {
      type: DataTypes.STRING
    },
    unitTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Unit type is required.' }
      }
    }
  }, {
    sequelize,
    modelName: 'Unit',
  });
  return Unit;
};