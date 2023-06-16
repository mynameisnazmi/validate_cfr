const jwt = require("jsonwebtoken");
const responseformat = require("../utils/responsformat");

const authenticateToken = (req, res, next) => {
  //Get token
  const authHeader = req.headers["authorization"];
  //compare and split toker bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return responseformat(401, "Unauthorized", "", res);
  }
  //check the token with ACCESS_TOKEN_SECRET
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userid) => {
    if (err) {
      return responseformat(403, "Forbidden Access", "", res);
    }
    console.log(userid);
    //assign extract data payload to req.user
    req.userid = userid;
  });
};

// Export of all methods as object
module.exports = {
  authenticateToken,
};
