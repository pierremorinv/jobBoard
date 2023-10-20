const { People } = require("../db/sequelize");

module.exports = (app) => {
  // Récupère tous les élements

  app.get("/api/peoples", (req, res) => {
    People.findAll()
      .then((peoples) => {
        const message = "the list of peoples has been retrieved.";
        res.status(201).json({ message, data: peoples });
      })
      .catch((error) => {
        const message =
          "The list of the people couldn't be found. You should retry later";
        res.status(500).json({ message, data: error });
      });
  });

  // Récupère un élément en comparant l'id écrit dans l'url

  app.get("/api/peoples/:id", (req, res) => {
    People.findByPk(req.params.id)
      .then((people) => {
        if (people === null) {
          const message =
            "The requested people does not exist. try again with another id";
          return res.status(404).json({ message });
        }
        const message = " an people have been found'.";
        res.json({ message, data: people });
      })

      .catch((error) => {
        const message =
          "the people could not be retrieved. Try again in a few moments";
        res.status(500).json({ message, data: error });
      });
  });
  // crée un élément dans la base de données

  app.post("/api/peoples", (req, res) => {
    People.create(req.body)
      .then((people) => {
        const message = `the people have been create`;
        res.json({ message, data: people });
      })
      .catch((error) => {
        const message =
          "the people could not be created. Try again in a few moments";
        res.status(500).json({ message, data: error });
      });
  });

  // modifie une élément dans la base de données

  app.put("/api/peoples/:id", (req, res) => {
    const id = req.params.id; // Utilisation de req.params.id pour obtenir l'ID
    People.update(req.body, { where: { id: id } }).then(() => {
      People.findByPk(id).then((people) => {
        if (people === null) {
          const message =
            "The requested people does not exist. try again with another id";
          return res.status(404).json({ message });
        }
        const message = "the people have been modified.";
        res.json({ message, data: people });
      });
    });
  });

  // Supprime une élément dans la base de données

  app.delete("/api/peoples/:id", (req, res) => {
    People.findByPk(req.params.id)
      .then((people) => {
        if (people === null) {
          const message = "the people doesnt exist try with an other id";
          return res.status(404).json({ message });
        }
        peopleDeleted = people;
        People.destroy({
          where: { id: people.id },
        }).then((_) => {
          const message = `the people wipeopleDeleted.id} have been deleted`;
          res.json({ message, data: peopleDeleted });
        });
      })
      .catch((error) => {
        const message = `the people couldn't be delete try in a few moments`;
        res.status(500).json({ message, data: error });
      });
  });
};
