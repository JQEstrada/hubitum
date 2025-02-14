'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    // Revert column names in habits table
    await queryInterface.renameColumn("habits", "createdat", "createdAt");
    await queryInterface.renameColumn("habits", "updatedat", "updatedAt");

    // Revert column names in frequencytypes table
    await queryInterface.renameColumn("frequencytypes", "createdat", "createdAt");
    await queryInterface.renameColumn("frequencytypes", "updatedat", "updatedAt");

    // Revert column names in unittypes table
    await queryInterface.renameColumn("unittypes", "createdat", "createdAt");
    await queryInterface.renameColumn("unittypes", "updatedat", "updatedAt");

    // Rename columns in units table
    await queryInterface.renameColumn("units", "createdat", "createdAt");
    await queryInterface.renameColumn("units", "updatedat", "updatedAt");

    // Rename columns in users table
    await queryInterface.renameColumn("users", "createdat", "createdAt");
    await queryInterface.renameColumn("users", "updatedat", "updatedAt");
  },

  down: async (queryInterface, Sequelize) => {
    
    // Rename columns in habits table
    await queryInterface.renameColumn("habits", "createdAt", "createdat");
    await queryInterface.renameColumn("habits", "updatedAt", "updatedat");

    // Rename columns in frequencytypes table
    await queryInterface.renameColumn("frequencytypes", "createdAt", "createdat");
    await queryInterface.renameColumn("frequencytypes", "updatedAt", "updatedat");

    // Rename columns in unittypes table
    await queryInterface.renameColumn("unittypes", "createdAt", "createdat");
    await queryInterface.renameColumn("unittypes", "updatedAt", "updatedat");

    // Rename columns in units table
    await queryInterface.renameColumn("units", "createdAt", "createdat");
    await queryInterface.renameColumn("units", "updatedAt", "updatedat");

    // Rename columns in users table
    await queryInterface.renameColumn("users", "createdAt", "createdat");
    await queryInterface.renameColumn("users", "updatedAt", "updatedat");
  },
};