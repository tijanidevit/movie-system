const Sequelize = require('sequelize');
const sequelize = new Sequelize('mts', 'root', '123456', {
    host: 'localhost',
    dialect: 'postgres',
});
module.exports = {
    db: sequelize
};