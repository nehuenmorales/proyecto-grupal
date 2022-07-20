const { Router } = require("express");
// me traigo el controller aca
const { gamesIncomplete,detailGameIncomplete} = require("../controllers/Games/gamesIncomplete");
 
const router = Router();

router.get("/gamesIncomplete", gamesIncomplete);
router.get("/gamesIncomplete/:id",detailGameIncomplete)

module.exports = router;