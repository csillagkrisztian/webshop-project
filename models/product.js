"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.category);
      this.belongsToMany(models.customer, {
        through: "orders",
        foreignKey: "productId",
      });
    }
  }
  product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "product",
    }
  );
  return product;
};
