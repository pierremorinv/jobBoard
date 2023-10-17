const { Advertisement } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/advertisements", (req, res) => {
    Advertisement.findAll().then((advertisements) => {
      const message = "la liste des entreprises à bien été trouvé.";
      res.json({ message, data: advertisements });
    });
  });
};
