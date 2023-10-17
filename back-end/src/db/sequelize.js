/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const AdvertisementModel = require("../models/advertisement");
const CompanyModel = require("../models/company");
const InformationModel = require("../models/information");
const PeopleModel = require("../models/people");
const pokemons = require("./mock-pokemon");

const sequelize = new Sequelize("jobboard", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const Pokemon = PokemonModel(sequelize, DataTypes);
const Advertisement = AdvertisementModel(sequelize, DataTypes);
const Company = CompanyModel(sequelize, DataTypes);
const Information = InformationModel(sequelize, DataTypes);
const People = PeopleModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync().then((_) => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types.join(),
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });
    Advertisement.create({
      job: "Développeur intégrateur web",
      jobDate: "2023-10-11",
      jobOffer: "Super poste à Pourvoir",
      jobLocation: "Cestas",
      salary: 7000,
      workingTime: 35,
    }).then((advertisement) => console.log(advertisement.toJSON()));

    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  Pokemon,
  Advertisement,
  Company,
  Information,
  People,
};
