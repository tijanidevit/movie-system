"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ User, Movie }) {
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
      this.belongsTo(Movie, { foreignKey: "movieId", as: "movie" });
    }
  }
  Comment.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User ID Required" },
          notEmpty: { msg: "User ID cannot be empty" },
        },
      },
      movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Movie Required" },
          notEmpty: { msg: "Movie cannot be empty" },
        },
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Comment Required" },
          notEmpty: { msg: "Comment cannot be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "comments",
      modelName: "Comment",
    }
  );
  return Comment;
};
