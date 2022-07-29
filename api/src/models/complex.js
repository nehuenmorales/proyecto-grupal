const { DataTypes } = require("sequelize");
const { UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("complex", {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    // id: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   primaryKey: true
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING, //DataTypes.BLOB("Long")
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sports: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 2.5,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  },
  {
    timestamps: false,
  });
};
