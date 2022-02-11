"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Record.belongTo(models.Category);
    }
  }
  Record.init(
    {
      amount: {
        type: DataTypes.FLOAT.UNSIGNED,
        allowNull: false,
        validate: {
          isFloat: true,
          notNull: true,
        },
      },
      subject: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          isIn: [["income", "expense"]],
        },
      },
    },
    {
      sequelize,
      modelName: "Record",
      tableName: "records",
    }
  );
  return Record;
};
