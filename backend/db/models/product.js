'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    info: DataTypes.TEXT
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.ProductImage, { foreignKey: 'productId', onDelete: 'CASCADE', hooks: true });
    Product.hasMany(models.Review, {foreignKey: 'productId', onDelete: 'CASCADE', hooks: true });
    Product.hasMany(models.Orderitem, { foreignKey: 'productId',onDelete: 'CASCADE', hooks: true });
    Product.hasMany(models.Collectionitem, { foreignKey: 'productId',onDelete: 'CASCADE', hooks: true });

  };
  return Product;
};