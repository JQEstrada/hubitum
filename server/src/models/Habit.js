module.exports = (sequelize, DataTypes) => {

  const Habit = sequelize.define('Habit', {
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
        unique: true
    },
    description: DataTypes.STRING
  }, {
    tableName: 'Habits', // Ensure this matches the actual table name
  })
  

  return Habit

}