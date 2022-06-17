const express = require('express');
const router = express.Router();
const restoreController = require('../controllers/restoreStock');

router.put('/', restoreController.stockRestore);

module.exports = router;