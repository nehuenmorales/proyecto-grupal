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
        allowNull: true,
    },
    sport: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('In Progress', 'Incomplete', 'Complete'),
        allowNull: true
    },
    result: {
        type: DataTypess.STRING,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: true
    },
    link: {
        type: DataTypes.STRING
    }

  });
};
