const { DataTypes } = require("sequelize");
const { UUIDV4 } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "teams",
    {
      id:{
        type:DataTypes.UUIDV4,
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          min: 1,
          max: 5,
        },
      },
      elo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        
      },
      sport: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amountPlayers:{
        type:DataTypes.INTEGER,
        allowNull:false,
      }
    },
    {
      timestamps: false,
    }
  );
};
