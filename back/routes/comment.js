const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment');
const auth = require('../middleware/auth');


router.post('/',auth, commentController.addComment);

router.get('/:productId', commentController.findProductComment);

module.exports = router;