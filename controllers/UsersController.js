const Users = require("../models/UserModel");
const responseformat = require("../utils/responsformat");
// const jwt = require("jsonwebtoken");
// const md5 = require("md5");

const register = async (req, res) => {
  try {
    // const { nik, name, password, age } = req.body;
    // console.log("on " + nik);
    // console.log(name);
    // console.log(password);
    // console.log(age);

    Users.getUserdata().then(function (value) {
      console.log(value[1].nama);
      console.log(value[2].nama);
      responseformat(200, value, "ok", res);
    });

    // const salt = bcrypt.genSaltSync(10);
    // // hash password dengan salt
    // const hashpassword = bcrypt.hashSync(password, salt);
    // await Users.create({
    //   nik: nik,
    //   name: nama,
    //   password: hashpassword,
    //   level: level,
    //   department: department,
    // });
  } catch (error) {
    responseformat(404, "not ok", "User not Create", res);
    //console.log(error.message);
  }
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      nik: user.ID,
      name: user.first_name,
      typeUser: user.typeUser,
      department: user.department,
    },
    "kunciRahasia",
    {
      // expiresIn: "5s",
    }
  );
};

// const generateRefreshToken = (user) => {
//   return jwt.sign(
//     { id: user.id, isAdmin: user.isAdmin },
//     "kunciRahasiaRefresh"
//   );
// };

const Auth = async (req, res) => {
  const { nik, password } = req.body;
  try {
    const getPassword = await Users.findOne({
      where: {
        ID: nik,
      },
      attributes: ["pass"],
      raw: true,
    });
    //compare data
    bcrypt.compare(password, getPassword.password, async (err, cmpres) => {
      if (cmpres) {
        //get data
        const userData = await Users.findOne({
          where: {
            ID: nik,
          },
          attributes: ["ID", "first_name", "typeUser", "department"],
          raw: true,
        });
        //console.log(userData.nik);
        const accessToken = generateAccessToken(userData);
        //console.log(accessToken);
        responseformat(200, accessToken, "ok", res);
      } else {
        responseformat(401, "", "Password not Correct", res);
      }
    });
  } catch (error) {
    responseformat(404, "", "Not Found", res);
    //    console.log(error.message);
  }
};

const deleteUser = async (req, res) => {
  const nik = req.params.nik;
  console.log(nik);
  const user = await Users.findOne({
    where: {
      nik: nik,
    },
  });

  if (!user) {
    responseformat(404, user, "Data not found", res);
  } else {
    try {
      await Users.destroy({
        where: {
          nik: nik,
        },
      });
      responseformat(200, user, "ok", res);
    } catch (error) {
      console.log(error.message);
    }
  }
};

const getAlluser = async (req, res) => {
  try {
    const response = await Users.findAll();
    responseformat(200, response, "ok", res);
  } catch (error) {
    console.log(error.message);
  }
};

// Export of all methods as object
module.exports = {
  //getAlluser,
  Auth,
  register,
  deleteUser,
};
