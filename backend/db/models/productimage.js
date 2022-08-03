'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define('ProductImage', {
    productId: DataTypes.INTEGER,
    siteUrl: DataTypes.STRING
  }, {});
  ProductImage.associate = function(models) {
    // associations can be defined here
    ProductImage.belongsTo( models.Product, { foreignKey: 'id' });
  };
  return ProductImage;
};