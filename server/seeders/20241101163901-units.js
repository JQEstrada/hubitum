'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      const unitTypes = await queryInterface.bulkInsert('unittypes', [
          {
            name: 'Times',
            isactive: true,
            createdat: new Date(),
            updatedat: new Date()
          },
          {
            name: 'Volume',
            isactive: true,
            createdat: new Date(),
            updatedat: new Date()
          },
          {
            name: 'Distance',
            isactive: true,
            createdat: new Date(),
            updatedat: new Date()
          },
          {
            name: 'Time',
            isactive: true,
            createdat: new Date(),
            updatedat: new Date()
          },
          {
            name: 'Weight',
            isactive: true,
            createdat: new Date(),
            updatedat: new Date()
          },
          {
            name: 'Custom',
            isactive: true,
            createdat: new Date(),
            updatedat: new Date()
          }
      ], { returning: true });

      const timesUnitTypeId = unitTypes[0].id;
      const volumeUnitTypeId = unitTypes[1].id;
      const distanceUnitTypeId = unitTypes[2].id;
      const timeUnitTypeId = unitTypes[3].id;
      const weightUnitTypeId = unitTypes[4].id;

      await queryInterface.bulkInsert('units', [
          {
            name: 'Times',
            shortname: 'x',
            isactive: true,
            unittypeid: timesUnitTypeId,
            createdat: new Date(),
            updatedat: new Date()
          },
          {
            name: 'Liters',
            shortname: 'L',
            isactive: true,
            unittypeid: volumeUnitTypeId,
            createdat: new Date(),
            updatedat: new Date()
          },
          {
            name: 'Milliliters',
            shortname: 'mL',
            isactive: true,
            unittypeid: volumeUnitTypeId,
            createdat: new Date(),
            updatedat: new Date()
          },
          {
            name: 'Kilometers',
            shortname: 'Km',
            isactive: true,
            unittypeid: distanceUnitTypeId,
            createdat: new Date(),
            updatedat: new Date()
          },
          {
            name: 'Miles',
            shortname: 'mi',
            isactive: true,
            unittypeid: distanceUnitTypeId,
            createdat: new Date(),
            updatedat: new Date()
          },
          {
            name: 'Meters',
            shortname: 'm',
            isactive: true,
            unittypeid: distanceUnitTypeId,
            createdat: new Date(),
            updatedat: new Date()
          },
          {
            name: 'Hours',
            shortname: 'h',
            isactive: true,
            unittypeid: timeUnitTypeId,
            createdat: new Date(),
            updatedat: new Date()
          },
          {
            name: 'Minutes',
            shortname: 'min',
            isactive: true,
            unittypeid: timeUnitTypeId,
            createdat: new Date(),
            updatedat: new Date()
          },
          {
            name: 'Kilograms',
            shortname: 'kg',
            isactive: true,
            unittypeid: weightUnitTypeId,
            createdat: new Date(),
            updatedat: new Date()
          },
          {
            name: 'Grams',
            shortname: 'g',
            isactive: true,
            unittypeid: weightUnitTypeId,
            createdat: new Date(),
            updatedat: new Date()
          }
      ], {});
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('units', null, {});
    await queryInterface.bulkDelete('unittypes', null, {});
  }
};
