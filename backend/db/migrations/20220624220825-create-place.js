'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Places', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users' },

      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      address: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true
      },
      imageURL: {
        type: Sequelize.STRING(250)
      },
      type: {
        type: Sequelize.STRING
      },
      avgRating: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Places');
  }
};
