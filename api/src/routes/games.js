const { Router } = require("express");
const { gamesIncomplete,detailGameIncomplete} = require("../controllers/Games/gamesIncomplete");
const { getGames, getFields } = require("../controllers/Games/allGames.js");
const { getSearchGames } = require("../controllers/Games/getSearchGames");
 
const router = Router();

router.get("/gamesIncomplete", gamesIncomplete);
router.get("/gamesIncomplete/:id",detailGameIncomplete);
router.get("/:sport", getGames);
router.get("/:sport/searchGame",getSearchGames)





module.exports = router;