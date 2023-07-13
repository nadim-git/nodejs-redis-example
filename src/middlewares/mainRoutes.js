// *** All Routes *** //
const redisRoute = require("../routes/redisRoutes");





//  ***  Exporting Routes in the index files ***
module.exports = function (app) {
  app.use("/redis/api", redisRoute);


  app.all("*", (req, res) => {
    res.status(404).send({
      status: "error",
      message: "This endpoint is not available",
    });
  });


};
