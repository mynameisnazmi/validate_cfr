const { Sequelize } = require("sequelize");

const db = new Sequelize("learn-test", "root", "dev", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = db;
