const {Router} = require('express');
const { getFields,detailFields } = require('../controllers/Owner/Field/getFields');
const { getSearchField } = require('../controllers/Owner/Field/getSearchFields');

const router = Router();

router.get('/:sport', getFields)
router.get('/detail/:id', detailFields)
router.get('/:sport/getSearchField', getSearchField)


module.exports = router

