const express = require('express');
const router = express.Router();
const partnercontroller = require('../Contollers/partnercontroller');
const path = require('path');

var multer = require('multer');
 
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
//         // cb(null, file.fieldname + '-' + Date.now())
//     }
// });
 
// var upload = multer({ storage: storage });
var Storage= multer.diskStorage({
    destination: (req, file, cb) => {
                cb(null, 'uploads')
            },
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  });
  
  var upload = multer({
    storage:Storage
  });

router.get('/partnerwithus', partnercontroller.partner_get);
router.post('/partnerwithus',upload.single('image'), partnercontroller.partner_post);

        
  
module.exports = router;
