const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const { success, getUniqueId } = require("./helper");
let pokemons = require("./mock-pokemon");
const PokemonModel = require("./src/models/pokemon");
const AdvertisementModel = require("./src/models/advertisements");
const CompanyModel = require("./src/models/companie");
const InformationModel = require("./src/models/information");
const PeopleModel = require("./src/models/people");

const app = express();
const port = 3000;

const sequelize = new Sequelize("jobboard", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

sequelize
  .authenticate()
  .then((_) =>
    console.log("la connexion à la base de données a bien été étabie.")
  )
  .catch((error) =>
    console.error(`impossible de se connecter a la base de donnéees ${error}`)
  );
const Pokemon = PokemonModel(sequelize, DataTypes);
const Advertisement = AdvertisementModel(sequelize, DataTypes);
const Company = CompanyModel(sequelize, DataTypes);
const Information = InformationModel(sequelize, DataTypes);
const People = PeopleModel(sequelize, DataTypes);
sequelize
  .sync({ force: true })
  .then((_) => console.log("la base de données à bien était syncroniséee."));

app
  .use(favicon(__dirname + "/google.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello, Express !🖖"));
// retourne tous les éléments de la liste

app.get("/api/pokemons", (req, res) => {
  const message = "Voici la liste des 12 pokémons";
  res.json(success(message, pokemons));
});

// retourne l'élement qui a la même id que celui de l'url
app.get("/api/pokemons/:id/", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id == id);
  if (pokemon.id == id) {
    const message = "Un pokémon à bien était trouvé";
    res.json(success(message, pokemon));
  } else {
    return error;
  }
});
// ajoute un élément dans la base de données
app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `le Pokemon ${pokemonCreated.name} a bien été crée.`;
  res.json(success(message, pokemonCreated));
});
// modifie un élément dans la base de données
app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((pokemon) => {
    return pokemon.id === id ? pokemonUpdated : pokemon;
  });
  const message = `le pokemon ${pokemonUpdated.name} a bien été modifié`;
  res.json(success(message, pokemonUpdated));
});
// supprime un élément dans la base de données
app.delete("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
  pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
  const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`;
  res.json(success(message, pokemonDeleted));
});

app.listen(port, () => {
  console.log(
    `Notre application Node est démarée sur : http://localhost:${port}`
  );
});
