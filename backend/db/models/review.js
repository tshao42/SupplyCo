'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    title: DataTypes.TEXT,
    content: DataTypes.TEXT,
    rating: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, {foreignKey: 'userId'});
    Review.belongsTo(models.Product, {foreignKey: 'productId'});
  };
  return Review;
};