"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Comment }) {
      this.hasMany(Comment, {
        foreignKey: "userId",
        as: "comments",
      });
    }

    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
  User.init(
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Fullname Required" },
          notEmpty: { msg: "Fullname cannot be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Email Address Required" },
          notEmpty: { msg: "Email Address cannot be empty" },
          isEmail: { msg: "Email Address not valid" },
        },
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Profile image Required" },
          notEmpty: { msg: "Profile image cannot be empty" },
        },
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Password Required" },
          notEmpty: { msg: "Password cannot be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
