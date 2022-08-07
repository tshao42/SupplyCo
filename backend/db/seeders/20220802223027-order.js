'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Orders', [{
        userId: 1,
        addressLine1: "200 N. Spring St.",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90012",
        orderFor: 'Demo User',
        total: 8995.00 
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Orders', null, {});
  }
};
