'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('frequencytypes', [
        {
          name: 'Daily',
          isactive: true,
          createdat: new Date(),
          updatedat: new Date()
        },
        {
          name: 'Weekly',
          isactive: true,
          createdat: new Date(),
          updatedat: new Date()
        },
        {
          name: 'Monthly',
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
    ], {});
    
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('frequencytypes', null, {});
     
  }
};
