const { Information } = require("../db/sequelize");

module.exports = (app) => {
  // Récupère tous les élements

  app.get("/api/informations", (req, res) => {
    Information.findAll()
      .then((informations) => {
        const message = "the list of informations has been retrieved.";
        res.status(201).json({ message, data: informations });
      })
      .catch((error) => {
        const message =
          "The list of the information couldn't be found. You should retry later";
        res.status(500).json({ message, data: error });
      });
  });

  // Récupère un élément en comparant l'id écrit dans l'url

  app.get("/api/informations/:id", (req, res) => {
    Information.findByPk(req.params.id)
      .then((information) => {
        if (information === null) {
          const message =
            "The requested information does not exist. try again with another id";
          return res.status(404).json({ message });
        }
        const message = " an information have been found'.";
        res.json({ message, data: information });
      })

      .catch((error) => {
        const message =
          "the information could not be retrieved. Try again in a few moments";
        res.status(500).json({ message, data: error });
      });

    // crée un élément dans la base de données

    app.post("/api/informations", (req, res) => {
      Information.create(req.body)
        .then((information) => {
          const message = `the information have been create`;
          res.json({ message, data: information });
        })
        .catch((error) => {
          const message =
            "the information could not be created. Try again in a few moments";
          res.status(500).json({ message, data: error });
        });
    });

    // modifie une élément dans la base de données

    app.put("/api/informations/:id", (req, res) => {
      const id = req.params.id; // Utilisation de req.params.id pour obtenir l'ID
      Information.update(req.body, { where: { id: id } }).then(() => {
        Information.findByPk(id).then((information) => {
          if (information === null) {
            const message =
              "The requested information does not exist. try again with another id";
            return res.status(404).json({ message });
          }
          const message = "the information have been modified.";
          res.json({ message, data: information });
        });
      });
    });

    // Supprime une élément dans la base de données

    app.delete("/api/informations/:id", (req, res) => {
      Information.findByPk(req.params.id)
        .then((information) => {
          if (information === null) {
            const message = "the information doesnt exist try with an other id";
            return res.status(404).json({ message });
          }
          const informationDeleted = information;
          Information.destroy({
            where: { id: information.id },
          }).then((_) => {
            const message = `the information with id n°${informationDeleted.id} have been deleted`;
            res.json({ message, data: informationDeleted });
          });
        })
        .catch((error) => {
          const message = `the information couldn't be delete try in a few moments`;
          res.status(500).json({ message, data: error });
        });
    });
  });
};
