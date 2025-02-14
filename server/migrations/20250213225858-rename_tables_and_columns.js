'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename tables to lowercase
    await queryInterface.renameTable("Habits", "habits");
    await queryInterface.renameTable("HabitDates", "habitdates");
    await queryInterface.renameTable("FrequencyTypes", "frequencytypes");
    await queryInterface.renameTable("UnitTypes", "unittypes");
    await queryInterface.renameTable("Units", "units");
    await queryInterface.renameTable("Users", "users");

    // Rename columns in habits table
    await queryInterface.renameColumn("habits", "startDate", "startdate");
    await queryInterface.renameColumn("habits", "isActive", "isactive");
    await queryInterface.renameColumn("habits", "userId", "userid");
    await queryInterface.renameColumn("habits", "unitId", "unitid");
    await queryInterface.renameColumn("habits", "createdAt", "createdat");
    await queryInterface.renameColumn("habits", "updatedAt", "updatedat");
    await queryInterface.renameColumn("habits", "frequencyTypeId", "frequencytypeid");

    // Rename columns in habitdates table
    await queryInterface.renameColumn("habitdates", "habitId", "habitid");
    await queryInterface.renameColumn("habitdates", "isDone", "isdone");
    await queryInterface.renameColumn("habitdates", "unitsDone", "unitsdone");

    // Rename columns in frequencytypes table
    await queryInterface.renameColumn("frequencytypes", "isActive", "isactive");
    await queryInterface.renameColumn("frequencytypes", "createdAt", "createdat");
    await queryInterface.renameColumn("frequencytypes", "updatedAt", "updatedat");

    // Rename columns in unittypes table
    await queryInterface.renameColumn("unittypes", "isActive", "isactive");
    await queryInterface.renameColumn("unittypes", "createdAt", "createdat");
    await queryInterface.renameColumn("unittypes", "updatedAt", "updatedat");

    // Rename columns in units table
    await queryInterface.renameColumn("units", "isActive", "isactive");
    await queryInterface.renameColumn("units", "createdAt", "createdat");
    await queryInterface.renameColumn("units", "updatedAt", "updatedat");
    await queryInterface.renameColumn("units", "unitTypeId", "unittypeid");
    await queryInterface.renameColumn("units", "shortName", "shortname");

    // Rename columns in users table
    await queryInterface.renameColumn("users", "createdAt", "createdat");
    await queryInterface.renameColumn("users", "updatedAt", "updatedat");
  },

  down: async (queryInterface, Sequelize) => {
    // Revert table names back to original
    await queryInterface.renameTable("habits", "Habits");
    await queryInterface.renameTable("habitdates", "HabitDates");
    await queryInterface.renameTable("frequencytypes", "FrequencyTypes");
    await queryInterface.renameTable("unittypes", "UnitTypes");
    await queryInterface.renameTable("units", "Units");
    await queryInterface.renameTable("users", "Users");

    // Revert column names in habits table
    await queryInterface.renameColumn("Habits", "startdate", "startDate");
    await queryInterface.renameColumn("Habits", "isactive", "isActive");
    await queryInterface.renameColumn("Habits", "userid", "userId");
    await queryInterface.renameColumn("habits", "unitid", "unitId");
    await queryInterface.renameColumn("habits", "createdat", "createdAt");
    await queryInterface.renameColumn("habits", "updatedat", "updatedAt");
    await queryInterface.renameColumn("habits", "frequencytypeid", "frequencyTypeId");

    // Revert column names in habitdates table
    await queryInterface.renameColumn("HabitDates", "habitid", "habitId");
    await queryInterface.renameColumn("HabitDates", "isdone", "isDone");
    await queryInterface.renameColumn("HabitDates", "unitsdone", "unitsDone");

    // Revert column names in frequencytypes table
    await queryInterface.renameColumn("frequencytypes", "isactive", "isActive");
    await queryInterface.renameColumn("frequencytypes", "createdat", "createdAt");
    await queryInterface.renameColumn("frequencytypes", "updatedat", "updatedAt");

    // Revert column names in unittypes table
    await queryInterface.renameColumn("unittypes", "isactive", "isActive");
    await queryInterface.renameColumn("unittypes", "createdat", "createdAt");
    await queryInterface.renameColumn("unittypes", "updatedat", "updatedAt");
    await queryInterface.renameColumn("units", "unittypeid", "unitTypeId");
    await queryInterface.renameColumn("units", "shortname", "shortName");

    // Rename columns in users table
    await queryInterface.renameColumn("users", "createdat", "createdAt");
    await queryInterface.renameColumn("users", "updatedat", "updatedAt");
  },
};