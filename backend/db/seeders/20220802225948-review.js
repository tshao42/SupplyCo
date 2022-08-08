'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [{
      productId: 1,
      userId: 1,
      title: 'Best Camera Ever',
      content: 'I cannot express how much I am satisfied with this viewfinder',
      rating: 5
    },
    {
      productId: 1,
      userId: 2,
      title: 'Very great product, not having reason to not love',
      content: 'Very overpriced tbh, but it does represent a high state of art that other camera brands cannot present us with. Truly impressed.',
      rating: 5
    }], {});
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
