'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Habittypes', [
        { name: 'Exercise', description: '' },
        { name: 'Meditation' },
        { name: 'Reading' },
        { name: 'Work' }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Habittypes', null, {});
  }

};
