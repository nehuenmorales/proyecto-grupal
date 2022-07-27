const { Router } = require("express");
const { gamesIncomplete,detailGameIncomplete} = require("../controllers/Games/gamesIncomplete");
const { getGames, getFields } = require("../controllers/Games/allGames.js");
const { getSearchGamesName, getSearchGamesCity } = require("../controllers/Games/getSearchGames");
 
const router = Router();

router.get("/gamesIncomplete", gamesIncomplete);
router.get("/gamesIncomplete/:id",detailGameIncomplete);
router.get("/:sport", getGames);
router.get("/:sport/searchGame",getSearchGamesName)
router.get("/:sport/searchGameCity",getSearchGamesCity)



module.exports = router;