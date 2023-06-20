const connection = require("../configs/Dbconnect");
const { Request, TYPES } = require("tedious");

const uploadfile = async () => {
  console.log("test11");
};

// Export of all methods as object
module.exports = {
  uploadfile,
};
