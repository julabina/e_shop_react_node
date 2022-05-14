const express = require('express');
const router = express.Router();

const oculaireController = require('../controllers/oculaire');


router.get('/', oculaireController.findAllOculaires);

router.get('/:id', oculaireController.findOneOculaire);

module.exports = router;
