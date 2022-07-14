const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('sponsors', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,  //DataTypes.BLOB("long") para cargar imagenes, investigar.
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },{
    timestamps:false
  });
};