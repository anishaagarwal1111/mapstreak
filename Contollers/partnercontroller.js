const mongoose = require('mongoose');
const Partner = require('../models/partnerModel');
const multer = require('multer');
// const jwt = require('jsonwebtoken');


//creating jso web token
// const Token = (id) => {
//     return jwt.sign({id}, 'partnership', {
//         expiresIn: '30d',
//     });
// };

// router.post('/upload', upload,function(req, res, next) {
//     var imageFile=req.file.filename;
//    var success =req.file.filename+ " uploaded successfully";
  
//    var imageDetails= new partnerModel({
//     imagename:imageFile
//    });
//    imageDetails.save(function(err,doc){
//   if(err) throw err;
  
//   imageData.exec(function(err,data){
//   if(err) throw err;
//   res.render('upload-file', { title: 'Upload File', records:data,   success:success });
//   });
  
//    });
  
//     });
   
//     router.get('/upload', function(req, res, next) {
//         imageData.exec(function(err,data){
//           if(err) throw err;
//       res.render('upload-file', { title: 'Upload File', records:data, success:'' });
//         });
//       });   

// module.exports.partner_get = async(req,res) => {
//  res.render('joinus');
// }

// module.exports.partner_post = async(req,res) => {
//     const {outletName, state, city, primary_location, pincode, outlet_type, contact_person, name, phone_no, type_of_cusines, time} = req.body;
//     try{
//         const partner = await Partner.create({outletName, state, city, primary_location, pincode, outlet_type, contact_person, name, phone_no, type_of_cusines, time});
//         if(partner){
//             res.status(201);
//             res.json({
//                 _id: partner._id,
//                 outletName: partner.outletName,
//                 state: partner.state,
//                 city: partner.city,
//                 primary_location: partner.primary_location,
//                 pincode: partner.pincode,
//                 outlet_type: partner.outlet_type,
//                 contact_person: partner.contact_person,
//                 name: partner.name,
//                 phone_no: partner.phone_no,
//                 type_of_cusines: partner.type_of_cusines,
//                 time: partner.time,
//             });
//         }
        
//         else{
//             res.status(400);
//             throw new Error("Invalid details");
//         }
//     }
//     catch(err){
//         console.log(err);
//     }
// }