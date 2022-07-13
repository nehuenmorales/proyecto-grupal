const {Router} = require('express');
const user = require('../controllers/Users/getUsers')

const router = Router();

router.get('/', user)

module.exports = router