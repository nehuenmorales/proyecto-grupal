
const { Router } = require("express");
const { getSupplies } = require("../controllers/Owner/Supplies/getSupplies");

const router = Router();

router.get("/:sport/:id", getSupplies);

module.exports = router;