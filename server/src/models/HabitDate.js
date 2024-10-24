module.exports = (sequelize, DataTypes) => {

  const HabitDate = sequelize.define('HabitDate', {
    id: {
      type: DataTypes.INTEGER,    // Integer type
      autoIncrement: true,        // Enable auto-increment
      primaryKey: true,           // Set as primary key
      allowNull: false,           // Ensure it's not null
    },
    isDone: DataTypes.BOOLEAN,
    date: DataTypes.DATEONLY
    // habitId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: Habit,  
    //     key: 'id',    
    //   },
    //   allowNull: false
    // },
    // userId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: User,  
    //     key: 'id',    
    //   },
    //   allowNull: false
    // }
  }, {
    tableName: 'HabitDates', // Ensure this matches the actual table name
  })

  

  return HabitDate

}