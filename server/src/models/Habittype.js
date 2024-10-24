module.exports = (sequelize, DataTypes) => {

  const Habittype = sequelize.define('Habittype', {
    id: {
      type: DataTypes.INTEGER,    // Integer type
      autoIncrement: true,        // Enable auto-increment
      primaryKey: true,           // Set as primary key
      allowNull: false,           // Ensure it's not null
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    description: DataTypes.STRING
  })

  

  return Habittype

}