const { Sequelize } = require("sequelize");

const db = new Sequelize("checklistnew", "root", "dev32016", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = db;
