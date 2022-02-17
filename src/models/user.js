("use strict");

const {
  hashPasswordAsync,
  comparePasswordAsync,
} = require("../utils/bcrypt.utils");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Record, { foreignKey: "userId" });
    }

    validPassword = async (password) => {
      return comparePasswordAsync(password, this.password);
    };
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
        validate: {
          isIn: [["user", "admin"]],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await hashPasswordAsync(user.password);
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            user.password = await hashPasswordAsync(user.password);
          }
        },
      },
    }
  );
  return User;
};
