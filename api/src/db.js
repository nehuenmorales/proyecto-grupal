require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAMEDB,PORT } = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAMEDB,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/faltauno`,
        { logging: false, native: false }
      );
// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAMEDB}`,

//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );

const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Complex,
  Field,
  Games,
  Owner,
  Player,
  Products,
  Sponsors,
  Supplies,
  Teams,
  Tournament,
} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Player.belongsToMany(Teams, { through: "player_teams", timestamps: false });
Teams.belongsToMany(Player, { through: "player_teams", timestamps: false });

Teams.belongsToMany(Tournament, {
  through: "teams_tournament",
  timestamps: false,
});
Tournament.belongsToMany(Teams, {
  through: "teams_tournament",
  timestamps: false,
});

Player.belongsToMany(Games, { through: "player_games", timestamps: false });
Games.belongsToMany(Player, { through: "player_games", timestamps: false });

Teams.belongsTo(Games);
Games.hasMany(Teams);

Supplies.belongsTo(Complex);
Complex.hasMany(Supplies);

Field.belongsTo(Complex);
Complex.hasMany(Field);

Games.belongsTo(Field, {foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Field.hasMany(Games, {foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

Games.belongsTo(Tournament);
Tournament.hasMany(Games);

Products.belongsTo(Sponsors);
Sponsors.hasMany(Products);

Complex.belongsTo(Owner);
Owner.hasMany(Complex);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};