'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    body: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users' }
    },
    placeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Places' }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Review.associate = function (models) {
    Review.belongsTo(models.Place, {
      foreignKey: 'placeId',
      onDelete: 'cascade',
      hooks: true
    })

    Review.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Review;
};
