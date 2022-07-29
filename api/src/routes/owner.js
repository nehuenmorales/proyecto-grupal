const { Router } = require("express");
// me traigo el controller aca
const { createField } = require("../controllers/Owner/Field/createField.js");
const { modifyField } = require("../controllers/Owner/Field/modifyField");
const { createSupplies } = require("../controllers/Owner/Supplies/createSupplies");
const { modifySupplies } = require("../controllers/Owner/Supplies/modifySupplies");
const { createGame } = require("../controllers/Owner/Games/createGame.js");
const { modifyGame } = require("../controllers/Owner/Games/modifyGame.js");
const { deleteSupplies } = require("../controllers/Owner/Supplies/deleteSupplies");
const { getBookedGames } = require("../controllers/Owner/Games/getBookedGames");

const { createOwner } = require("../controllers/Owner/owner/createOwner");
const { getOwner } = require("../controllers/Owner/owner/getOwner");
const { createComplex } = require('../controllers/Owner/Complex/createComplex');
const { getCities } = require("../controllers/apiCities/getCities.js");

const router = Router();

router.get("/getOwner", getOwner);

router.post("/createField", createField);

router.put("/modifyField/:id", modifyField);

router.post("/createSupplies", createSupplies);

router.put("/modifySupplies/:id", modifySupplies);

router.post("/createOwner", createOwner);

router.post("/createGame", createGame);

router.put("/modifyGame/:id", modifyGame);

router.delete("/deleteSupplies/:id", deleteSupplies);

router.get("/getBookedGames", getBookedGames);

router.post('/createComplex', createComplex)

router.get('/getCities', getCities)

module.exports = router;
