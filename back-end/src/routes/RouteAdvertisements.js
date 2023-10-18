const { Advertisement } = require("../db/sequelize");

module.exports = (app) => {
  // Récupère tous les élements

  app.get("/api/advertisements", (req, res) => {
    Advertisement.findAll()
      .then((advertisements) => {
        const message = "the list of advertisements has been retrieved.";
        res.json({ message, data: advertisements });
      })
      .catch((error) => {
        const message =
          "The list of the advertisement couldn't be found. You should retry later";
        res.status(500).json({ message, data: error });
      });
  });

  // Récupère un élément en comparant l'id écrit dans l'

  app.get("/api/advertisements/:id", (req, res) => {
    Advertisement.findByPk(req.params.id)
      .then((advertisement) => {
        if (advertisement === null) {
          const message =
            "The requested advertisement does not exist. try again with another id";
          return res.status(404).json({ message });
        }
        const message = " an advertisement have been found'.";
        res.json({ message, data: advertisement });
      })

      .catch((error) => {
        const message =
          "the advertisement could not be retrieved. Try again in a few moments";
        res.status(500).json({ message, data: error });
      });

    // crée un élément dans la base de données

    app.post("/api/advertisements", (req, res) => {
      Advertisement.create(req.body)
        .then((advertisement) => {
          const message = `the advertisement have been create`;
          res.json({ message, data: advertisement });
        })
        .catch((error) => {
          const message =
            "the advertisement could not be created. Try again in a few moments";
          res.status(500).json({ message, data: error });
        });
    });

    // modifie une élément dans la base de données

    app.put("/api/advertisements/:id", (req, res) => {
      const id = req.params.id; // Utilisation de req.params.id pour obtenir l'ID
      Advertisement.update(req.body, { where: { id: id } }).then(() => {
        Advertisement.findByPk(id).then((advertisement) => {
          if (advertisement === null) {
            const message =
              "The requested advertisement does not exist. try again with another id";
            return res.status(404).json({ message });
          }
          const message = "the advertisement have modified.";
          res.json({ message, data: advertisement });
        });
      });
    });

    // Supprime une élément dans la base de données

    app.delete("/api/advertisements/:id", (req, res) => {
      Advertisement.findByPk(req.params.id).then((advertisement) => {
        const advertisementDeleted = advertisement;
        Advertisement.destroy({
          where: { id: advertisement.id },
        }).then((_) => {
          const message = `the advertisement with id n°${advertisementDeleted.id} have been deleted`;
          res.json({ message, data: advertisementDeleted });
        });
      });
    });
  });
};
