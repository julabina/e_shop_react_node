const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/telescopes', productsController.findAllTelescope)
router.get('/telescopes/:id', productsController.findOneTelescope)
router.get('/oculaires', productsController.findAllOculaire)
router.get('/oculaires/:id', productsController.findOneOculaire)
router.get('/montures', productsController.findAllMonture)
router.get('/montures/:id', productsController.findOneMonture)
router.get('/promotion', productsController.findPromo)

module.exports = router;