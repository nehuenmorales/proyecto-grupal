const { DataTypes } = require("sequelize");
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      available: {
        type: DataTypes.ENUM("true", "false"), // no puede ser un booleano porque rompe
        allowNull: false,
      },
      pricePerHour: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      start:{
        type: DataTypes.STRING,
        allowNull: false
      },
      end: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false,
    }
  );
};
