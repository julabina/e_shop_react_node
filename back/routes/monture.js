const express = require('express');
const router = express.Router();

const montureController = require('../controllers/monture');


router.get('/', montureController.findAllMontures);

router.get('/:id', montureController.findOneMonture);

module.exports = router;