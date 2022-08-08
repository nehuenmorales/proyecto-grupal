const { Router } = require("express");
const { bannearPlayer } = require("../controllers/players/bannearPleyer");

//traigo los controllers
const { createPlayer } = require("../controllers/players/createPlayer");
const { deletePlayer } = require("../controllers/players/deletePlayer");
const { getPlayerProfile } = require("../controllers/players/getPlayerProfile");
const { getPlayers } = require("../controllers/players/getPlayers");
const {getSearchPlayer} = require('../controllers/players/getSearchPlayer')
const { modifyProfile } = require('../controllers/players/modifyProfile')



const router = Router();

router.post("/createplayer", createPlayer);

router.get("/getPlayers", getPlayers);

router.get("/getSearchPlayer", getSearchPlayer);

router.get("/getPlayerProfile", getPlayerProfile);

router.put("/modifyProfile", modifyProfile)

router.put('/modifyStatus/:id', bannearPlayer)

router.post('/delete/:id', deletePlayer)

module.exports = router;
