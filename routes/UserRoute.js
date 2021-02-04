const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

router.get('/login',UserController.get_login);
router.post('/login',UserController.post_login);