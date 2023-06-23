const Dashboard = require("../models/DashboardModel.js");

const responseformat = require("../utils/responsformat");

const uploadfile = async (req, res) => {
  console.log("test");
  console.log(req.file);
  //Dashboard.uploadfile().then(() => {});
};

// Export of all methods as object
module.exports = {
  uploadfile,
};
