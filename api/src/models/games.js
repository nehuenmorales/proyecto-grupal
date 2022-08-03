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
        type: DataTypes.ENUM("futbol", "basquet", "padel", "tenis"),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("free","pending","booked"),
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
      },
      privacy:{
        type: DataTypes.ENUM("public", "private"),
        defaultValue: "public",
        allowNull:true,
      },
      requirements:{
        type:DataTypes.STRING,
        allowNull:true,
      }
    },
    {
      timestamps: false,
    }
  );
};
