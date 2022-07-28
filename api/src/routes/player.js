const { Router } = require("express");

//traigo los controllers
const { createPlayer } = require("../controllers/players/createPlayer");
const { getPlayerProfile } = require("../controllers/players/getPlayerProfile");
const { getPlayers } = require("../controllers/players/getPlayers");
const {getSearchPlayer} = require('../controllers/players/getSearchPlayer')


const router = Router();

router.post("/createplayer", createPlayer);

router.get("/getPlayers", getPlayers);

router.get("/getSearchPlayer", getSearchPlayer);

router.get("/getPlayerProfile", getPlayerProfile);

module.exports = router;
