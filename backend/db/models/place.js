'use strict';
module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'Users' }
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true
    },
    imageURL: {
      type: DataTypes.STRING(250)
    },
    avgRating: {
      type: DataTypes.INTEGER,
    },
    type: DataTypes.STRING
  }, {});

  Place.associate = function (models) {
    Place.belongsTo(models.User, { foreignKey: 'userId' });
    Place.hasMany(models.Review, {// may not need onDelete cascade
      foreignKey: 'placeId',
      onDelete: 'cascade',
      hooks: true
    })


  };
  return Place;
};
