const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = 3000;
const corsOptions = {
  origin: "http://127.0.0.1:5500",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app
  .use(favicon(__dirname + "/google.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json())
  .use(cors(corsOptions));

sequelize.initDb();

require("./src/routes/findAllAdvertisements")(app);

app.listen(port, () => {
  console.log(
    `Notre application Node est démarée sur : http://localhost:${port}`
  );
});
