const { Router } = require("express");
// Importar todos los routers;

const fields = require('./fields.js');
const users = require("./users.js");
const owner = require("./owner.js");

const router = Router();

// Configurar los routers
router.use("/users", users);
router.use("/owner", owner);
router.use('/fields',fields);

module.exports = router;
