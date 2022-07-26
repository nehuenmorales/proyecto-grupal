const {Router} = require('express');
const { getFields } = require('../controllers/Owner/Field/getFields');

const router = Router();

router.get('/:sport', getFields)

module.exports = router

