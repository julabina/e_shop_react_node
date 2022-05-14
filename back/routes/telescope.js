const express = require('express');
const router = express.Router();
const telescopeController = require('../controllers/telescope');


router.get('/', telescopeController.getAllTelescopes);
router.get('/:id', telescopeController.getOneTelescope);


module.exports = router;