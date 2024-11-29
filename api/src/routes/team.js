const {Router} = require('express');
const { createTeam } = require('../controllers/Teams/createTeam');
const { getTeamsUser } = require('../controllers/Teams/getTeamsUser');
const {getTeam} = require('../controllers/Teams/getTeam')
const {aceptInvitation} = require('../controllers/Teams/aceptInvitation')

const router = Router();

// router.get('/getTournament/:sport', getTournament)

router.post('/createTeam',createTeam)
router.get('/getTeamUser/:email',getTeamsUser)
router.get('/getTeam/:id', getTeam)
router.post('/aceptInvitation', aceptInvitation)


module.exports = router