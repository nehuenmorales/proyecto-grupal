const {Router} = require('express');
const { getComplex } = require("../controllers/Complex/getComplex");
const { createComplex } = require('../controllers/Owner/complex/createComplex');

const router = Router();

router.get('/all', getComplex)
router.post('/createComplex', createComplex)

module.exports = router