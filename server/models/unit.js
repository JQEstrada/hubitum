'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      unit.belongsTo(models.unittype, {
        foreignKey: 'unittypeid'
      });
      unit.hasMany(models.habit, {
        foreignKey: 'unitid'
      });
    }
  }
  unit.init({   
    id: {
      type: DataTypes.INTEGER,    // Integer type
      autoIncrement: true,        // Enable auto-increment
      primaryKey: true,           // Set as primary key
      allowNull: false,           // Ensure it's not null
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    shortname: {
      type: DataTypes.STRING
    },
    unittypeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Unit type is required.' }
      }
    }
  }, {
    sequelize,
    modelName: 'unit',
  });
  return unit;
};