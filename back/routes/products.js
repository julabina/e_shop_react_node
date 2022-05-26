const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/telescopes', productsController.findAllTelescope)

module.exports = router;