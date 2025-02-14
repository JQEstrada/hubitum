'use strict';
 

const {
  Model, UniqueConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class habit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      habit.belongsTo(models.user, {
        foreignKey: 'userid'
      });
      habit.belongsTo(models.frequencytype, {
        foreignKey: 'frequencytypeid'
      });
      habit.hasMany(models.habitdate, {
        foreignKey: 'habitid'
      });
      habit.belongsTo(models.unit, {
        foreignKey: 'unitid'
      });
    }
  }
  habit.init({   
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
    startdate: {
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
    goal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Habit goal is required.' }
      }
    },
    description: DataTypes.STRING,
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Habit user error.' }
      }
    },
    frequencytypeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Habit frequency is required.' }
      }
    },
    unitid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Habit unit is required.' }
      }
    },
    streak: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'habit',
    indexes: [
      {
        unique: true,
        fields: ['name', 'userId'],
        name: 'unique_name_userId_constraint'
      }
    ]
  });


  // Hook to handle unique constraint errors and set a custom message
  habit.addHook('beforeValidate', (habit, options) => {
    if (!habit.name || !habit.userid) return;
    
    if(habit.id != null) return 

    return habit.findOne({ where: { name: habit.name, userid: habit.userid } })
      .then(existingHabit => {
        if (existingHabit) {
          throw new UniqueConstraintError({
            message: 'A habit with this name already exists for this user.',
            errors: [{ message: 'A habit with this name already exists for this user.' }]
          });
        }
      });
  });


  return habit;
};