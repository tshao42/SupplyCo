'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    buyerId: DataTypes.INTEGER,
    addressPlaceId: DataTypes.STRING,
    orderFor: DataTypes.STRING,
    total: DataTypes.DECIMAL
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.User, { foreignKey: 'id' });
    // Order.belongsToMany(models.Product, { through: 'Orderitem', foreignKey: 'orderId'})
    Order.hasMany(models.Orderitem, { foreignKey: 'orderId', onDelete: 'CASCADE', hooks: true })

  };
  return Order;
};