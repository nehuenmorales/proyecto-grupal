const {Router} = require('express');
const { getTournament } = require('../controllers/Tournaments/getTournament');

const router = Router();

router.get('/getTournament/:sport', getTournament)

module.exports = router