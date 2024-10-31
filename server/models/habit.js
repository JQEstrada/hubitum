'use strict';
 

const {
  Model, UniqueConstraintError
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
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    startDate: {
      type: DataTypes.DATEONLY,
      validate: {
        isFutureDate(value) {
          // Check if the instance is being created (not updated)
          if (this.isNewRecord && new Date(value) < new Date('2024-01-01').setHours(0, 0, 0, 0)) {
            throw new Error('The start date must be later than January 1st 2024.');
          }
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Habit name is required.' },
        notEmpty: { msg: 'Habit name cannot be empty.' }
      }
    },
    description: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Habit user error.' }
      }
    },
    frequencyTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Habit frequency is required.' }
      }
    }
  }, {
    sequelize,
    modelName: 'Habit',
    indexes: [
      {
        unique: true,
        fields: ['name', 'userId'],
        name: 'unique_name_userId_constraint'
      }
    ]
  });


  // Hook to handle unique constraint errors and set a custom message
  Habit.addHook('beforeValidate', (habit, options) => {
    if (!habit.name || !habit.userId) return;

    return Habit.findOne({ where: { name: habit.name, userId: habit.userId } })
      .then(existingHabit => {
        if (existingHabit) {
          throw new UniqueConstraintError({
            message: 'A habit with this name already exists for this user.',
            errors: [{ message: 'A habit with this name already exists for this user.' }]
          });
        }
      });
  });


  return Habit;
};