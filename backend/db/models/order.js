'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: DataTypes.INTEGER,
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    orderFor: DataTypes.STRING,
    total: DataTypes.DECIMAL
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.User, { foreignKey: 'userId' });
    // Order.belongsToMany(models.Product, { through: 'Orderitem', foreignKey: 'orderId'})
    Order.hasMany(models.Orderitem, { foreignKey: 'orderId', onDelete: 'CASCADE', hooks: true })

  };
  return Order;
};