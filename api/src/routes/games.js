const { Router } = require("express");
const { gamesIncomplete,detailGameIncomplete} = require("../controllers/Games/gamesIncomplete");
const { getGames} = require("../controllers/Games/allGames.js");
const {updateGame}=require("../controllers/Games/gamesIncomplete.js")
const {detailGame}=require("../controllers/Games/gameById.js")
 
const router = Router();

router.get("/gamesIncomplete", gamesIncomplete);
router.get("/gamesIncomplete/:id",detailGameIncomplete);
router.get("/:sport", getGames);
router.put("/gamesIncomplete/:id",updateGame)
router.get("/detail/:id",detailGame)



module.exports = router;