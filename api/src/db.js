require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAMEDB } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAMEDB}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
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
const { complex, field, games, owner, player, products, sponsors, supplies, teams, tournament } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

player.belongsToMany(teams, {through:"player_teams", timestamps: false})
teams.belongsToMany(player, {through:"player_teams", timestamps: false})

teams.belongsToMany(tournament, {through:"teams_tournament", timestamps: false})
tournament.belongsToMany(teams, {through:"teams_tournament", timestamps: false})

player.belongsToMany(games, {through:"player_games", timestamps: false})
games.belongsToMany(player, {through:"player_games", timestamps: false})

teams.belongsTo(games)
games.hasMany(teams)

supplies.belongsTo(complex)
complex.hasMany(supplies)

field.belongsTo(complex)
complex.hasMany(field)

games.belongsTo(field)
field.hasMany(games)

games.belongsTo(tournament)
tournament.hasMany(games)

products.belongsTo(sponsors)
sponsors.hasMany(products)

complex.belongsTo(owner)
owner.belongsTo(complex)


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
