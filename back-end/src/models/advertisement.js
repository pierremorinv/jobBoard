module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Advertisement",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      job: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jobDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      jobOffer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jobLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      workingTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
