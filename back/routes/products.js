const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

const auth = require('../middleware/auth');

router.get('/telescopes', productsController.findAllTelescope);
router.get('/telescopes/:id', productsController.findOneTelescope);
router.get('/oculaires', productsController.findAllOculaire);
router.get('/oculaires/:id', productsController.findOneOculaire);
router.get('/montures', productsController.findAllMonture);
router.get('/montures/:id', productsController.findOneMonture);
router.post('/promotion', productsController.findPromo);
router.post('/telescopes', productsController.findFilteredTelescopes);
router.post('/oculaires', productsController.findFilteredOculaires);
router.post('/montures', productsController.findFilteredMontures);
router.put('/:id', auth, productsController.removeStock);

module.exports = router;