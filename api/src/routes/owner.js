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
const { getOwner } = require("../controllers/Owner/owner/getOwner.js");
const { createComplex } = require('../controllers/Owner/Complex/createComplex');
const { getCities } = require("../controllers/apiCities/getCities.js");
const { getNameComplex} = require("../controllers/Complex/getNameComplex.js");
const {getComplexByOwner} = require("../controllers/Owner/Complex/getComplexByOwner.js")
const {getSuppliesByOwner} = require("../controllers/Owner/Supplies/getSuppliesByOwner.js");
const {getFieldByOwner} = require("../controllers/Owner/Field/getFieldByOwner.js");
const {getComplexDetail} = require("../controllers/Owner/Complex/getComplexDetail");
const { modifyComplex } = require("../controllers/Owner/Complex/modifyComplex.js");



const router = Router();

router.get("/getOwner/:id", getOwner);

router.get("/getNameComplex", getNameComplex)

router.get("/getComplexByOwner/:id", getComplexByOwner)

router.get("/getFieldByOwner/:id", getFieldByOwner)

router.get("/getSuppliesByOwner/:id", getSuppliesByOwner)

router.get("/getComplexDetail/:id", getComplexDetail)

router.post("/createField", createField);

router.put("/modifyComplex/:id", modifyComplex)

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
