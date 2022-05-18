const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middleware/auth');


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/:id',auth, userController.modifyProfilInfos);
router.put('/password/:id', auth, userController.modifyPassword);
router.post('/:id', auth, userController.findOneUser);


module.exports = router;