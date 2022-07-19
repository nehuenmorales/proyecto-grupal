const { Router } = require("express");
// Importar todos los routers;

const player = require("./player.js");
const owner = require("./owner.js");

const router = Router();

// Configurar los routers
router.use("/player", player);
router.use("/owner", owner);

module.exports = router;
