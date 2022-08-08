const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "sponsors",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cuit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      logo:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      address:{
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      timestamps: false,
    }
  );
};
