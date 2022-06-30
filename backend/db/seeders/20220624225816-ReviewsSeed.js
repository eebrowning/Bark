'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Reviews', [
      { id: 1, title: "My ball was deflated...", body: "but that didn't stop me from having a great time here!", rating: 5, userId: 3, placeId: 3, createdAt: new Date(), updatedAt: new Date(), }
    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
