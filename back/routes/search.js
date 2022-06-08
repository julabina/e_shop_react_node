const express = require('express');
const router = express.Router();

const searchController = require('../controllers/search');

router.get('/', searchController.searchProducts);
router.post('/', searchController.searchProductsFiltered);

module.exports = router;