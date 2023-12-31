const express = require("express");
const apicache = require("apicache");
const cors = require("cors");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = 3000;
const cache = apicache.middleware;
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

require("./src/routes/RouteAdvertisements")(app);
require("./src/routes/RouteCompany")(app);
require("./src/routes/RoutePeople")(app);
require("./src/routes/RouteInformation")(app);
app.use(cache("5 minutes"));
// app.use(({ res }) => {
//   const message =
//     "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
//   res.status(404).json({ message });
// });

app.listen(port, () => {
  console.log(
    `Notre application Node est démarée sur : http://localhost:${port}`
  );
});
