const { Router } = require('express');
// Importar todos los routers;

const users = require('./users.js');


const router = Router();

// Configurar los routers
router.use('/users', users);


module.exports = router;