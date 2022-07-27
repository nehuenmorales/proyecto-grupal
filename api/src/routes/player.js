const { Router } = require("express");

//traigo los controllers
const { createPlayer } = require("../controllers/players/createPlayer");
const { getPlayers } = require("../controllers/players/getPlayers");
const { getSearchPlayer } = require("../controllers/players/getSearchPlayer");

const router = Router();

router.post("/createplayer", createPlayer);

router.get("/getPlayers", getPlayers);

router.get("/getSearchPlayer", getSearchPlayer);


module.exports = router;
