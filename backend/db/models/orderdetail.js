'use strict';
module.exports = (sequelize, DataTypes) => {
  const Orderdetail = sequelize.define('Orderdetail', {
    buyerId: DataTypes.INTEGER,
    addressPlaceId: DataTypes.STRING,
    orderFor: DataTypes.STRING,
    total: DataTypes.DECIMAL
  }, {});
  Orderdetail.associate = function(models) {
    // associations can be defined here
    Orderdetail.belongsTo(models.User, { foreignKey: 'userId' });
    Orderdetail.belongsToMany(models.Product, { through: 'Orderitem', as: 'orders', foreignKey: 'orderId', otherKey: 'productId' })

  };
  return Orderdetail;
};