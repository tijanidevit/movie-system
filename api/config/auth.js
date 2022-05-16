const Sequelize = require("sequelize");
const sequelize = new Sequelize("movies", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});
module.exports = {
  db: sequelize,
};
