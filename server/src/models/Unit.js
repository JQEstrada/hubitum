module.exports = (sequelize, DataTypes) => {

  const Unit = sequelize.define('Unit', {
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
    }
  }, {
    tableName: 'Units', // Ensure this matches the actual table name
  })
  

  return Unit

}