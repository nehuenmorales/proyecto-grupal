const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('games', {
    id: {
        type: DataTypes.UUID,
        defaultVale: DataTypes.UUIDV4,
        primaryKey: true
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sport: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('In Progress', 'Incomplete', 'Complete'),
        allowNull: false
    },
    result: {
        type: DataTypess.STRING,
        allowNull: true
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true
    }

  });
};
