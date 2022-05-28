const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const auth = require('../middleware/auth');


router.post('/', auth, commentController.addComment);
router.get('/:id', commentController.findProductComment);
router.put('/:id', auth, commentController.modifyComment);
router.delete('/:id', auth, commentController.deleteComment);


module.exports = router;