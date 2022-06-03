const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const auth = require('../middleware/auth');


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/:id',auth, userController.modifyProfilInfos);
router.put('/password/:id', auth, userController.modifyPassword);
router.put('/email/:id', auth, userController.modifyEmail);
router.post('/', auth, userController.findOneUser);
router.get('/:id', userController.findName);


module.exports = router;