'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order_item = sequelize.define('Order_item', {
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    default_placeId: DataTypes.STRING
  }, {});
  Order_item.associate = function(models) {
    // associations can be defined here
  };
  return Order_item;
};