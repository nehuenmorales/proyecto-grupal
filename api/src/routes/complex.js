const {Router} = require('express');
const { getComplex } = require("../controllers/Complex/getComplex");

const { createComplex } = require('../controllers/Owner/complex/createComplex');
const {getSearchComplex} = require('../controllers/Complex/getSearchComplex');
const { getCities } = require('../controllers/apiCities/getCities');

const router = Router();

router.get('/all', getComplex)
router.post('/createComplex', createComplex)
router.get('/:sport/searchComplex', getSearchComplex)
router.get('/getCities', getCities)



module.exports = router