const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('teams', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating:{
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 0
    },
    elo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    sports:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
    timestamps:false
  });
};