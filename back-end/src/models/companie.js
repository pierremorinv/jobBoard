module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Companie", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameOfTheCompany: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfemployees: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pictureoftheCompany: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
