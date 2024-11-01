'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('UnitTypes', [
          {
            name: 'Times',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Volume',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Distance',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Time',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Weight',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Custom',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
          }
      ], { returning: true });

      const unitTypes = await queryInterface.sequelize.query(
        `SELECT id FROM UnitTypes ORDER BY createdAt DESC LIMIT 6;`
      );
      console.log('UnitType IDs:', unitTypeIds); // Log unit type IDs
      const timesUnitTypeId = unitTypes[0].id
      const volumeUnitTypeId = unitTypes[1].id
      const distanceUnitTypeId = unitTypes[2].id
      const timeUnitTypeId = unitTypes[3].id
      const weightUnitTypeId = unitTypes[4].id

      await queryInterface.bulkInsert('Units', [
          {
            name: 'Times',
            shortName: 'x',
            isActive: true,
            unitTypeId: timesUnitTypeId,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Liters',
            shortName: 'x',
            isActive: true,
            unitTypeId: volumeUnitTypeId,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Milliliters',
            shortName: 'x',
            isActive: true,
            unitTypeId: volumeUnitTypeId,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Kilometers',
            shortName: 'Km',
            isActive: true,
            unitTypeId: distanceUnitTypeId,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Miles',
            shortName: 'mi',
            isActive: true,
            unitTypeId: distanceUnitTypeId,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Meters',
            shortName: 'm',
            isActive: true,
            unitTypeId: distanceUnitTypeId,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Hours',
            shortName: 'h',
            isActive: true,
            unitTypeId: timeUnitTypeId,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Minutes',
            shortName: 'm',
            isActive: true,
            unitTypeId: timeUnitTypeId,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Kilograms',
            shortName: 'kg',
            isActive: true,
            unitTypeId: weightUnitTypeId,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Grams',
            shortName: 'g',
            isActive: true,
            unitTypeId: weightUnitTypeId,
            createdAt: new Date(),
            updatedAt: new Date()
          }
      ], {});
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('UnitTypes', null, {});
    await queryInterface.bulkDelete('Units', null, {});

  }
};
