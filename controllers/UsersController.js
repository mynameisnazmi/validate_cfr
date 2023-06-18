const Users = require("../models/UserModel");
const responseformat = require("../utils/responsformat");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

const login = async (req, res) => {
  try {
    const { userid, password } = req.body;

    //validate string
    useridTrim = userid.trim();
    passwordTrim = password.trim();
    useridTrim = useridTrim.replace(/\s/g, "");
    passwordHash = md5(passwordTrim);

    //get user data
    Users.getUserdata(useridTrim, passwordHash).then(function (value) {
      // console.log(value[0].userid);
      // console.log(value[0].password);
      // console.log(value[0].nama);
      if (Object.keys(value).length == 0) {
        responseformat(404, "not ok", "User not found", res);
      } else {
        const userid = { userid: value[0].userid };
        const accessToken = jwt.sign(userid, process.env.ACCESS_TOKEN_SECRET);
        const data = { nama: value[0].nama, accessToken: accessToken };
        responseformat(200, data, "ok", res);
      }
    });

  } catch (error) {
    responseformat(404, "not ok", "User not found", res);
    //console.log(error.message);
  }
};

const savedata = async (req, res) => {
  try {
    const { userid } = req.userid;
    console.log(userid);
    console.log(req.body.test);
  } catch (error) {
    responseformat(404, "not ok", "User not Create", res);
    //console.log(error.message);
  }
};

const register = async (req, res) => {
  try {
    const { userid,nama,password } = req.body;

    //validate string
    useridTrim = userid.trim();
    passwordTrim = password.trim();
    namaTrim = nama.trim();
    useridTrim = useridTrim.replace(/\s/g, "");
    passwordHash = md5(passwordTrim);

    //insert data 
    Users.addUserdata(useridTrim, passwordHash,namaTrim).then(function (value) {
      // console.log(value[0].userid);
      // console.log(value[0].password);
      // console.log(value[0].nama);
      if (Object.keys(value).length == 0) {
        responseformat(404, "not ok", "User not found", res);
      } else {
        const userid = { userid: value[0].userid };
        const accessToken = jwt.sign(userid, process.env.ACCESS_TOKEN_SECRET);
        const data = { nama: value[0].nama, accessToken: accessToken };
        responseformat(200, data, "ok", res);
      }
    });

  } catch (error) {
    responseformat(404, "not ok", "User not Create", res);
    //console.log(error.message);
  }
};
// Export of all methods as object
module.exports = {
  savedata,
  login,
  register,
};
