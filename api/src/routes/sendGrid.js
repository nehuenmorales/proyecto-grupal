const { Router } = require("express");
const { sendInvitation } = require("../controllers/sendGrid/invitation")

const router = Router();

router.post("/invitation", sendInvitation);

module.exports = router;