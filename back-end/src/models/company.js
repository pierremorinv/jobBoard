module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Company", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameOfTheCompany: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfEmployees: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pictureOfTheCompany: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
