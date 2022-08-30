'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Collectionitems', [{
      collectionId: 1,
      itemId: 5
    },
    {
      collectionId: 1,
      itemId: 10
    },
    {
      collectionId: 2,
      itemId: 1
    }], {})
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Collectionitems', null, {});
  }
};
