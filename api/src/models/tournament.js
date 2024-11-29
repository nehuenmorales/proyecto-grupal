const { DataTypes } = require("sequelize");
const { UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("tournament", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ranking: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
    },
    sport: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status:{
      type: DataTypes.ENUM("PLAYING","FINISHED", "COMPLETE" , "INCOMPLETE" ),
      defaultValue: "INCOMPLETE",
      allowNull:false,
    }
  },
  {
    timestamps: false,
  });
};
