const {Router} = require('express');
const { getComplex } = require("../controllers/Complex/getComplex");

const {getSearchComplex} = require('../controllers/Complex/getSearchComplex');
const { getCities } = require('../controllers/apiCities/getCities');
const {RatingReviews}= require("../controllers/Rating/rating")

const router = Router();

router.get('/all', getComplex)
router.get('/:sport/searchComplex', getSearchComplex)
router.get('/getCities', getCities)
router.put("/rating/:id/:rating",RatingReviews)



module.exports = router