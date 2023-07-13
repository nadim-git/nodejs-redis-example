require("dotenv").config();

const express = require("express");
const fileupload = require("express-fileupload");

const corsHandler = require("../src/middlewares/cors");

const app = express();
const port = process.env.SERVER_PORT || 1000;

require("./db/db");
require("./db/redis");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileupload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use(corsHandler);

app.get("/", (req, res) => {
  res.send("Welcome || Nodejs + Mysql + REDIS");
});


// *** All routes loaded in this files ****//
require("./middlewares/mainRoutes")(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
