const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');

router.post('/send', contactController.sendMail);

module.exports = router;