'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Habits', 'goal', {
      type: Sequelize.DataTypes.INTEGER,  
      allowNull: false,
      defaultValue: 1                  
    });
    await queryInterface.addColumn('Habits', 'unitId', {
      type: Sequelize.DataTypes.INTEGER, 
      allowNull: true,
      references: {
        model: 'Units', // The name of the table in the database
        key: 'id',      // The key in the Users table
      },
      onDelete: 'CASCADE'         
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Habits', 'goal');
    await queryInterface.removeColumn('Habits', 'unitId');
  }
};
