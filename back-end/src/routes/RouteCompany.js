const { Company } = require("../db/sequelize");

module.exports = (app) => {
  // Récupère tous les élements

  app.get("/api/companies", (req, res) => {
    Company.findAll()
      .then((company) => {
        const message = "the list of companies has been retrieved.";
        res.json({ message, data: company });
      })
      .catch((error) => {
        const message =
          "The list of the companies couldn't be found. You should retry later";
        res.status(500).json({ message, data: error });
      });
  });

  // Récupère un élément en comparant l'id écrit dans l'url

  app.get("/api/companies/:id", (req, res) => {
    Company.findByPk(req.params.id)
      .then((company) => {
        if (company === null) {
          const message =
            "The requested company does not exist. try again with another id";
          return res.status(404).json({ message });
        }
        const message = " a company have been found'.";
        res.status(201).json({ message, data: company });
      })

      .catch((error) => {
        const message =
          "the company could not be retrieved. Try again in a few moments";
        res.status(500).json({ message, data: error });
      });

    // crée un élément dans la base de données

    app.post("/api/companies", (req, res) => {
      Company.create(req.body)
        .then((company) => {
          const message = `the company have been create`;
          res.json({ message, data: company });
        })
        .catch((error) => {
          const message =
            "the company could not be created. Try again in a few moments";
          res.status(500).json({ message, data: error });
        });
    });

    // modifie une élément dans la base de données

    app.put("/api/companies/:id", (req, res) => {
      const id = req.params.id; // Utilisation de req.params.id pour obtenir l'ID
      Company.update(req.body, { where: { id: id } }).then(() => {
        Company.findByPk(id).then((company) => {
          if (company === null) {
            const message =
              "The requested company does not exist. try again with another id";
            return res.status(404).json({ message });
          }
          const message = "the company have been modified.";
          res.json({ message, data: company });
        });
      });
    });

    // Supprime une élément dans la base de données

    app.delete("/api/companies/:id", (req, res) => {
      Company.findByPk(req.params.id)
        .then((company) => {
          if (company === null) {
            const message = "the company doesnt exist try with an other id";
            return res.status(404).json({ message });
          }
          const companyDeleted = company;
          Company.destroy({
            where: { id: company.id },
          }).then((_) => {
            const message = `the company with id n°${companyDeleted.id} have been deleted`;
            res.json({ message, data: companyDeleted.id });
          });
        })
        .catch((error) => {
          const message = `the company couldn't be delete try in a few moments`;
          res.status(500).json({ message, data: error });
        });
    });
  });
};
