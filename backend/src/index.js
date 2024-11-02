const express = require("express");
const { PORT } = require("./config/serverConfig");
const ApiRoutes = require("./routes/index");
const bodyParser = require("body-parser");
const cors = require("cors");

const setupAndStartServer = async () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/iiitn", ApiRoutes);

  app.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`);
  });
};

setupAndStartServer();
