const { Router } = require("express");

//traigo los controllers
const { createPlayer } = require("../controllers/players/createPlayer");
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

module.exports = router;
