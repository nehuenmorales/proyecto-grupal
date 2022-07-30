const {Router} = require('express');
const { createTeam } = require('../controllers/Teams/createTeam');

const router = Router();

// router.get('/getTournament/:sport', getTournament)

router.post('/createTeam',createTeam)

module.exports = router