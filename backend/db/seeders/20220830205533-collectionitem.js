'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Collectionitems', [{
      collectionId: 1,
      productId: 5
    },
    {
      collectionId: 1,
      productId: 10
    },
    {
      collectionId: 2,
      productId: 1
    }], {})
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Collectionitems', null, {});
  }
};
