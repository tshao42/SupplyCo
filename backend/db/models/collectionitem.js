'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collectionitem = sequelize.define('Collectionitem', {
    collectionId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER
  }, {});
  Collectionitem.associate = function(models) {
    // associations can be defined here
    Collectionitem.belongsTo(models.Collection, {foreignKey: 'collectionId'});
    Collectionitem.belongsTo(models.Product, { foreignKey: 'productId' });
  };
  return Collectionitem;
};