const {Router} = require('express');
const { createTeam } = require('../controllers/Teams/createTeam');
const { getTeamsUser } = require('../controllers/Teams/getTeamsUser');

const router = Router();

// router.get('/getTournament/:sport', getTournament)

router.post('/createTeam',createTeam)
router.get('/getTeamUser/:email',getTeamsUser)


module.exports = router