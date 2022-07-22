const { DataTypes } = require("sequelize");
const { UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "field",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sport: {
        type: DataTypes.ENUM("futbol", "basquet", "padel", "tenis"),
        allowNull: false,
      },
      available: {
        type: DataTypes.ENUM("true", "false"), // no puede ser un booleano porque rompe
        allowNull: false,
      },
      pricePerTurn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      open:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      close: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
