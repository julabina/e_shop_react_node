const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment');
const auth = require('../middleware/auth');


router.post('/',auth, commentController.addComment);

module.exports = router;