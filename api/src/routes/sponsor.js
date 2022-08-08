const {Router} = require('express');
const { createSponsor,getAllSponsors,createProduct,getAllProducts} = require("../controllers/sponsors/sponsors");

const router = Router();

router.post('/create', createSponsor)
router.get("/all",getAllSponsors)
router.post("/createProduct",createProduct)
router.get("/products/:sport",getAllProducts)



module.exports = router