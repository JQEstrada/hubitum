'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HabitDates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isDone: {
        type: Sequelize.BOOLEAN
      },
      habitId: { // Add this field for the foreign key
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Habits', // The name of the table in the database
          key: 'id',      // The key in the Users table
        },
        onDelete: 'CASCADE', // Optional: define behavior on delete
      },
      date: {
        type: Sequelize.DATEONLY
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
    await queryInterface.dropTable('HabitDates');
  }
};