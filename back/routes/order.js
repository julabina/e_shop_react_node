const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const auth = require('../middleware/auth');

router.post('/', auth, orderController.createOrder);
router.get('/:id', auth, orderController.getOrders);

module.exports = router;