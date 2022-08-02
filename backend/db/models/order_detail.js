'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order_detail = sequelize.define('Order_detail', {
    buyerId: DataTypes.INTEGER,
    addressPlaceId: DataTypes.STRING,
    orderFor: DataTypes.STRING,
    total: DataTypes.DECIMAL
  }, {});
  Order_detail.associate = function(models) {
    // associations can be defined here
  };
  return Order_detail;
};