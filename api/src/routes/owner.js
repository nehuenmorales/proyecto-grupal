const { Router } = require("express");
// me traigo el controller aca
const { createField } = require("../controllers/Owner/createField.js");
const { modifyField } = require("../controllers/Owner/modifyField");
const router = Router();

router.post("/", createField);

router.put("/:id", modifyField);

module.exports = router;
