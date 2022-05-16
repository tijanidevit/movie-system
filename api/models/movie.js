"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Comment }) {
      this.hasMany(Comment, { foreignKey: "movieID", as: "comments" });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Name required" },
          notEmpty: { msg: "Name cannot be empty" },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        validate: {
          notNull: { msg: "Description required" },
          notEmpty: { msg: "Description cannot be empty" },
        },
      },
      releaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Release Date required" },
          notEmpty: { msg: "Release Date cannot be empty" },
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Rating required" },
          notEmpty: { msg: "Rating cannot be empty" },
        },
      },
      ticketPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notNull: { msg: "Ticket price required" },
          notEmpty: { msg: "Ticket price cannot be empty" },
        },
      },
      country: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Country required" },
          notEmpty: { msg: "Country cannot be empty" },
        },
      },
      genre: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Genre required" },
          notEmpty: { msg: "Genre cannot be empty" },
        },
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Image required" },
          notEmpty: { msg: "Image cannot be empty" },
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
