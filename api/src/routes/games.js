const { Router } = require("express");
// me traigo el controller aca
const { gamesIncomplete} = require("../controllers/Games/gamesIncomplete");

const router = Router();

router.get("/gamesIncomplete", gamesIncomplete);

module.exports = router;