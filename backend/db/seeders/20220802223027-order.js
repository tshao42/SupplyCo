'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Orders', [{
        userId: 1,
        addressPlaceId: 'ChIJPwi-Dpne3IARhY3NJXuK8g0',
        orderFor: 'Demo User',
        total: 8995.00 
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Orders', null, {});
  }
};
