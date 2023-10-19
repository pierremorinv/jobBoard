const { Sequelize, DataTypes } = require("sequelize");
const AdvertisementModel = require("../models/advertisement");
const CompanyModel = require("../models/company");
const InformationModel = require("../models/information");
const PeopleModel = require("../models/people");

const sequelize = new Sequelize("jobboard", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const Advertisement = AdvertisementModel(sequelize, DataTypes);
const Company = CompanyModel(sequelize, DataTypes);
const Information = InformationModel(sequelize, DataTypes);
const People = PeopleModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync().then((_) => {
    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  Advertisement,
  Company,
  Information,
  People,
};
