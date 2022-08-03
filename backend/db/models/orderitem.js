'use strict';
module.exports = (sequelize, DataTypes) => {
  const Orderitem = sequelize.define('Orderitem', {
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
}, {});
  Orderitem.associate = function(models) {
    // associations can be defined here
    // Orderitem.hasMany(models.Product, {foreignKey: 'id'});
    Orderitem.belongsTo(models.Order, {foreignKey: 'id'});
    Orderitem.hasMany(models.Product, {foreignKey: 'id'})
  };
  return Orderitem;
};