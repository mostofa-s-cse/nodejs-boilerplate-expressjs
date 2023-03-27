const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.generateToken = (userInfo) => {
  const payload = {
    User_Email: userInfo.User_Email,
    role: userInfo.role,
  };

  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24,
  });

  return token;
};
