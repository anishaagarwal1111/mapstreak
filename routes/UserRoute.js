const express = require('express');
const router = express.Router();
const UserController = require('../Contollers/UserController');
const authRequire = require('../Middleware/forgotpassMiddleware');


router.get('/login',UserController.get_login);
router.post('/login',UserController.post_login);
router.post('/signup',UserController.post_signup);
router.get('/forgot-password',UserController.get_forgotpassword);
router.post('/forgot-password',UserController.post_forgotpassword);
router.get('/reset-password',UserController.get_resetpassword);
router.post('/reset-password', authRequire ,UserController.post_resetpassword);


module.exports = router;