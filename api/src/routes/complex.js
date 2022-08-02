const {Router} = require('express');
const { getComplex } = require("../controllers/Complex/getComplex");

const {getSearchComplex} = require('../controllers/Complex/getSearchComplex');
const { getCities } = require('../controllers/apiCities/getCities');

const router = Router();

router.get('/all', getComplex)
router.get('/:sport/searchComplex', getSearchComplex)
router.get('/getCities', getCities)



module.exports = router