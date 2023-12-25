const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];

    if (!token) {
      return res.status(401).send("You are not logged in");
    }

    const decoded = await jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      function (err, decoded) {
        if (err) {
          return res.send(err);
        }
        req.user = decoded;
        // console.log('object', req.user);
        next();
      }
    )

  } catch (error) {
    res.status(res).json({
      status: "Fail",
      error: error.message,
    });
  }
};
