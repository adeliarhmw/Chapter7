"use strict";
const { Model, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class user_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here ore relasi
      this.belongsTo(models.role, {
        foreignKey: "id_role",
        as: "role_user_game",
      });
      this.hasMany(models.user_game_history, {
        as: "user_game_history",
        foreignKey: "id_user",
      });
    }
  }
  user_game.init(
    {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          // isUnique: (value, next) => {
          //   user_game
          //     .findAll({
          //       where: { username: value },
          //       attributes: ["username"],
          //     })
          //     .then((user) => {
          //       if (user.length != 0)
          //         next(new Error("username sudah digunakan"));
          //       next();
          //     })
          //     .catch((onError) => console.log(onError));
          // },
          notNull: {
            msg: "tidak boleh kosong",
          },
        },
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "tidak boleh kosong",
          },
        },
      },

      token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      foto_profil: {
        type: DataTypes.TEXT,
      },

      video: {
        type: DataTypes.TEXT,
      },
      id_role: {
        type: DataTypes.INTEGER,
        allownull: false,
      },
    },
    {
      sequelize,
      modelName: "user_game",
    }
  );
  user_game.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  return user_game;
};
