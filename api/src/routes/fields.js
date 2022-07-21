const {Router} = require('express');
const { getFields } = require('../controllers/Owner/Field/getFields');

const router = Router();

router.get('/fields', getFields)

module.exports = router

