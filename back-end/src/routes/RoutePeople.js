const { People } = require("../models/people");
module.exports = (app) => {
  app.post("/api/peoples", (req, res) => {
    People.create(req.body).then((people) => {
      const firstName = req.body.FirstName;
      const lastName = req.body.LastName;
      const tel = req.body.tel;
      const email = req.body.email;
      const message = req.body.message;

      res.json({ data: people });
    });
  });
};
