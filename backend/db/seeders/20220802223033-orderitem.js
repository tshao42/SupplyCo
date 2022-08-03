'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Orderitems', [{
      orderId: 1,
      productId: 1,
      quantity: 2
    },
    {
      orderId: 1,
      productId: 2,
      quantity: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orderitems', null, {});
  }
};
