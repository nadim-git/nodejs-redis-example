module.exports = async function (req, res, next) {
  try {
    if (req.user.role == "A" || req.user.role == "S") {
      next();
    } else {
      return res.status(500).send({
        status: "error",
        message: "Unauthorized Access !, You are not admin",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};
