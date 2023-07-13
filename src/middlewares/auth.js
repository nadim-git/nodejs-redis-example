const jwt = require("jsonwebtoken");
module.exports = async function (req, res, next) {
  try {
    if (req.headers && req.headers.authorization) {
      let user = await jwt.verify(
        req.headers.authorization,
        process.env.ACCESS_SECRET_KEY
      );
      req.user = user;
      next();
    } else {
      return res.status(500).send({
        status: "error",
        message: "Unauthorized Access !,Please provide token",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: "error, in",
      message: error.message,
    });
  }
};
