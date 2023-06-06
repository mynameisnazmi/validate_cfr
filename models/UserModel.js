const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/DbUserCon.js");

const Users = db.define(
  "user",
  {
    ID: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
    },
    first_name: DataTypes.STRING(20),
    department: DataTypes.STRING(35),
    email: DataTypes.STRING(30),
    pass: DataTypes.STRING(100),
    typeUser: DataTypes.INTEGER(10),
    point: DataTypes.INTEGER(11),
    kunjungan: DataTypes.SMALLINT(6),
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
