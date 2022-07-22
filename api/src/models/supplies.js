const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('supplies', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sport:{
      type: DataTypes.STRING,
    },
    price:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },{
    timestamps:false
  });
};
