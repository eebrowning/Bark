'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'DemoDog',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'DemiDog',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'DummyDog',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'yagi@user.io',
        username: 'Yagi',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'Rusty@user.io',
        username: 'Rusty',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'Dodger@user.io',
        username: 'Dodger',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['DemoDog', 'DemiDog', 'DummyDog'] }
    }, {});
  }
};
