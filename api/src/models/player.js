const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('player', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    telephone:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    city:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    elo:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:0,
    },
    status:{
      type: DataTypes.ENUM("allowed","Banned"),
      allowNull: false,
      defaultValue:"allowed"
    }
  },{
    timestamps:false
  });
};
