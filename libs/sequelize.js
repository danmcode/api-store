const { Sequelize } = require("sequelize");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

options.connectionString = URI;

const sequelize = new Sequelize(URI, {
    dialect: "postgres",
    logging: true
});

module.exports = sequelize;
