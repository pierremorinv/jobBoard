module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "People",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      messageSent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adConcerned: {
        type: DataTypes.STRING,
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
