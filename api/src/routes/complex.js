const {Router} = require('express');
const { getComplex } = require("../controllers/Complex/getComplex");
const { createComplex } = require('../controllers/Owner/complex/createComplex');
const {getSearchComplex} = require('../controllers/Complex/getSearchComplex')

const router = Router();

router.get('/all', getComplex)
router.post('/createComplex', createComplex)
router.get('/:sport/searchComplex', getSearchComplex)


module.exports = router