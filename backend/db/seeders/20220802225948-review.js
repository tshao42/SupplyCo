'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [{
      productId: 1,
      userId: 1,
      title: 'Best Camera Ever',
      content: 'I cannot express how much I am satisfied with this viewfinder',
      rating: 5
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
