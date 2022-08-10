'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [{
      productId: 1,
      userId: 1,
      title: 'Best Camera Ever (at this price point)',
      content: 'Honestly--what more can you expect at this price point?',
      rating: 5
    },
    {
      productId: 1,
      userId: 2,
      title: 'Very great camera, not having reason to not love',
      content: 'Instant cameras are here for a reason and I am seeing very great balance for a machine under $200. Would recommend.',
      rating: 5
    }], {});
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
