const { Router } = require("express");
// me traigo el controller aca
const { createField } = require("../controllers/Owner/Field/createField.js");
const { modifyField } = require("../controllers/Owner/Field/modifyField");
const {
  createSupplies,
} = require("../controllers/Owner/Supplies/createSupplies");

const {
  modifySupplies,
} = require("../controllers/Owner/Supplies/modifySupplies");

const { createOwner } = require("../controllers/Owner/owner/createOwner");

const router = Router();

router.post("/createField", createField);

router.put("/modifyField/:id", modifyField);

router.post("/createSupplies", createSupplies);

router.put("/modifySupplies/:id", modifySupplies);

router.post("/createOwner", createOwner);

module.exports = router;
