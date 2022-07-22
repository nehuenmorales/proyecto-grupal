const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "games",
    {
      date: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      sport: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("free", "booked"),
        defaultValue: "free",
      },
      result: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      start: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      end: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: false,
    }
  );
};
