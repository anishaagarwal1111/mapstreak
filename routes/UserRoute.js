const express = require('express');
const router = express.Router();
const UserController = require('../Contollers/UserController');


router.get('/login',UserController.get_login);
router.post('/login',UserController.post_login);
router.get('/signup',UserController.get_signup);
router.post('/signup',UserController.post_signup);



module.exports = router;