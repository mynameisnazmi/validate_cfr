const { Sequelize, DataTypes } = require("sequelize");
const db = require("../configs/Dbconnect");

const Users = db.define(
  "users",
  {
    NIK: {
      type: Sequelize.INTEGER(10),
      primaryKey: true,
    },
    Password: DataTypes.TEXT,
    Name: DataTypes.STRING(50),
    Age: DataTypes.INTEGER(3),
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Users;

(async () => {
  await db.sync();
})();
