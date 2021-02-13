const express = require('express');
const router = express.Router();
const getTiffin = require('../Contollers/tiffinController');

router.get('/tiffinservices', getTiffin.get_tiffin);
router.get('/tiffinservices/:id', getTiffin.getTiffinById);
router.get('/tiffinservices/:id/veg', getTiffin.getTiffinveg);
router.get('/tiffinservices/:id/nonveg',getTiffin.getTiffinnonveg);

module.exports = router;


