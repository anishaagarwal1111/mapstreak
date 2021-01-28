const express = require('express');
const router = express.Router();
const partnercontroller = require('../Contollers/partnercontroller');

router.get('/partnerwithus', partnercontroller.partner_get);
// router.post('/partnerwithus', partnercontroller.partner_post);


module.exports = router;
