const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "teams",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 2.5,
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
        allowNull: false,
        unique: true,
      },
      sport: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
