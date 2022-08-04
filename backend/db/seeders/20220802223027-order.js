'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Orders', [{
        userId: 1,
        address: '1214 Synergy, Irvine, CA 92614',
        orderFor: 'Demo User',
        total: 8995.00 
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Orders', null, {});
  }
};
