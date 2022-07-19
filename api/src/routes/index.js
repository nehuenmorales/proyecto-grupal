const { Router } = require("express");
// Importar todos los routers;

const users = require("./users.js");
const owner = require("./owner.js");
const games= require("./games.js")

const router = Router();

// Configurar los routers
router.use("/users", users);
router.use("/owner", owner);
router.use("/games", games)

module.exports = router;
