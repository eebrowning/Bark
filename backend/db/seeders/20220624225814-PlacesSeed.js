'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Places', [
      {
        userId: 1,
        name: "Pub Dog",
        address: "2207 Bott Ave. Colorado Springs 80904",
        type: 'bar/restaurant',
        imageURL: "https://ponderosavetclinic.com/wp-content/uploads/2020/03/dog-friendly-pub-dog-colorado-springs.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        name: "Cerberus Brewing Company",
        address: "702 W Colorado Ave, Colorado Springs, CO, US, 80905",
        type: 'bar/restaurant',
        imageURL: "https://www.uncovercolorado.com/wp-content/uploads/2021/07/Cerberus-Brewing-Company-CO.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        name: "Rampart Dog Park",
        address: "8270 Lexington Dr, Colorado Springs, CO, US, 80920",
        type: 'dog park',
        imageURL: "https://s3-media2.fl.yelpcdn.com/bphoto/Rq8KkiWXN9pVfLFwmuykvQ/ls.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },


  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Places', null, {});
  }
};
