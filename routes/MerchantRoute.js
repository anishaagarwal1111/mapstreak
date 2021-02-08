const express = require('express');
const router = express.Router();
const MerchantController = require('../Contollers/MerchantController');


router.get('/merchant_login' ,MerchantController.merchant_get_login);
router.post('/merchant_login',MerchantController.merchant_post_login);
router.get('/merchant_signup',MerchantController.merchant_get_signup);
router.post('/merchant_signup',MerchantController.merchant_post_signup);



module.exports = router;