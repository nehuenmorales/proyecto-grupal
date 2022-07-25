const { DataTypes } = require('sequelize');
const { UUIDV4 } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('supplies', {
    id:{
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      
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
