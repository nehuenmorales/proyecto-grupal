const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "field",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sport: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      available: {
        type: DataTypes.ENUM("true", "false"), // no puede ser un booleano porque rompe
        allowNull: false,
      },
      pricePerHour: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      appointments: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
