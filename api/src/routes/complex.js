const {Router} = require('express');
const { getComplex } = require("../controllers/Complex/getComplex");
const { getSearchComplex } = require('../controllers/Complex/getSearchComplex');

const router = Router();

router.get('/all', getComplex)
router.get('/:sport/searchComplex', getSearchComplex)

module.exports = router