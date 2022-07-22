const { Router } = require("express");
// Importar todos los routers;

const player = require("./player.js");
const fields = require('./fields.js');
const owner = require("./owner.js");
const games= require("./games.js")

const router = Router();

// Configurar los routers
router.use("/player", player);
router.use("/owner", owner);
router.use("/games", games)
router.use('/fields',fields);

module.exports = router;
