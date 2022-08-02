'use strict';
module.exports = (sequelize, DataTypes) => {
  const Orderitem = sequelize.define('Orderitem', {
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    defaultPlaceId: DataTypes.STRING
  }, {});
  Orderitem.associate = function(models) {
    // associations can be defined here
    Orderitem.hasMany(models.Product, {foreignKey: 'productId'});
    Orderitem.belongsTo(models.Orderdetail);
  };
  return Orderitem;
};