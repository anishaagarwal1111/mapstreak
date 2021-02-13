const express = require('express');
const router = express.Router();
const getTiffin = require('../Contollers/tiffinController');

router.get('/tiffinservices', getTiffin.get_tiffin);
router.get('/tiffinservices/:id', getTiffin.getTiffinById);

module.exports = router;


