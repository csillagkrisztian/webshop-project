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
      name: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.STRING, allowNull: false },
      imageUrl: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: { type: DataTypes.TEXT, allowNull: false },
    },
    {
      sequelize,
      modelName: "product",
    }
  );
  return product;
};
