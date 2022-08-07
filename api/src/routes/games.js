const { Router } = require("express");
const { gamesIncomplete,detailGameIncomplete} = require("../controllers/Games/gamesIncomplete");
const { getGames, prebooked} = require("../controllers/Games/allGames.js");
const {updateGame}=require("../controllers/Games/gamesIncomplete.js")
const {detailGame, pagarProducto}=require("../controllers/Games/gameById.js")

const { getSearchGames } = require("../controllers/Games/getSearchGames");
const { searchGamesIncomplete } = require("../controllers/Games/searchGamesIncomplete");
const { gamesByUser } = require("../controllers/Games/gamesByUser");
 
const router = Router();

router.get("/gamesIncomplete", gamesIncomplete);
router.get("/gamesIncomplete/:id",detailGameIncomplete);
router.get("/:sport", getGames);
router.put("/gamesIncomplete/:id",updateGame)
router.get("/detail/:id",detailGame);
router.post("/comprar/:id", pagarProducto)
router.put("/updateGame",prebooked)
router.get("/:sport/searchGame",getSearchGames)
router.get("/:sport/searchGameIncomplete",searchGamesIncomplete)
router.get("/eventos/:id", gamesByUser)





module.exports = router;

