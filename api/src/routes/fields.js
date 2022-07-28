const {Router} = require('express');
const { getFields,detailFields } = require('../controllers/Owner/Field/getFields');

const router = Router();

router.get('/:sport', getFields)
router.get('/detail/:id', detailFields)

module.exports = router

