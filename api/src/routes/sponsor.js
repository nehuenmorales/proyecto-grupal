const {Router} = require('express');
const { createSponsor,getAllSponsors,createProduct} = require("../controllers/sponsors/sponsors");

const router = Router();

router.post('/create', createSponsor)
router.get("/all",getAllSponsors)
router.post("/createProduct",createProduct)



module.exports = router