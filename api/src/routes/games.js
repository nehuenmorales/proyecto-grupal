const { Router } = require("express");
const { gamesIncomplete,detailGameIncomplete} = require("../controllers/Games/gamesIncomplete");
const { getGames, getFields } = require("../controllers/Games/allGames.js");
 
const router = Router();

router.get("/gamesIncomplete", gamesIncomplete);
router.get("/gamesIncomplete/:id",detailGameIncomplete);
router.get("/:sport", getGames);



module.exports = router;