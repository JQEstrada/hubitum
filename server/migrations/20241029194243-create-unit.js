'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Units', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      unitTypeId: { // Add this field for the foreign key
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'UnitTypes', // The name of the table in the database
          key: 'id',      // The key in Unit Type table
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
    await queryInterface.dropTable('Units');
  }
};