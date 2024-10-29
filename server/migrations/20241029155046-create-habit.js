'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Habits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      startDate: {
        type: Sequelize.DATEONLY
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING
      },
      userId: { // Add this field for the foreign key
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // The name of the table in the database
          key: 'id',      // The key in the Users table
        },
        onDelete: 'CASCADE', // Optional: define behavior on delete
      },
      frequencyTypeId: { // Add this field for the foreign key
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'FrequencyTypes', // The name of the table in the database
          key: 'id',      // The key in the Users table
        },
        onDelete: 'CASCADE', // Optional: define behavior on delete
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Habits');
  }
};