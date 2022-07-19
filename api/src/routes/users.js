const {Router} = require('express');
const user = require('../controllers/Users/getUsers');
const { getUser } = require('../controllers/Users/infoUser/getUsers');

const router = Router();

router.get("/getUser", getUser);

module.exports = router