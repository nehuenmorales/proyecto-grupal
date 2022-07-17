const { Router } = require("express");
// me traigo el controller aca
const { createField } = require("../controllers/Owner/createField.js");
const router = Router();

router.post("/", createField);

module.exports = router;
