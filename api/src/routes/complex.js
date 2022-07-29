const {Router} = require('express');
const { getComplex } = require("../controllers/Complex/getComplex");


const router = Router();

router.get('/all', getComplex)


module.exports = router