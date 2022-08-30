'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Collections', [{
        userId: 1,
        collectionName: 'Future Trip'
      },
      {
        userId: 1,
        collectionName: 'Grad Gifts'
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Collections', null, {});
  }
};
