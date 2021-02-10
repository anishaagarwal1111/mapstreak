const express = require('express');
const router = express.Router();
const partnercontroller = require('../Contollers/partnercontroller');
// const path = require('path');
const nodemailer = require("nodemailer");
const Partner = require('../models/partnerModel');
const fs = require('fs');
var requireAuth = require('../Middleware/MerchantMiddleware');

var path;

var multer = require('multer');
 

var Storage= multer.diskStorage({
    destination: (req, file, cb) => {
                cb(null, 'uploads')
            },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
  });
  
  var upload = multer({
    storage:Storage
  }).single('image');

 router.get('/partnerwithus', requireAuth, partnercontroller.partner_get);


router.post('/partnerwithus',(req,res) => {
    upload(req,res,function(err){
        if(err){
            console.log(err)
            return res.end("Something went wrong!");
        }else{
            var obj = {
                                        outletName: req.body.outletName,
                                        state: req.body.state,
                                        city: req.body.city,
                                        primary_location: req.body.primary_location,
                                        pincode: req.body.pincode,
                                        outlettype: {
                                            Cloud_kitchen: req.body.outlettype1 ? true : false,
                                            Resturent: req.body.outlettype2 ? true : false,
                                            others: req.body.outlettype3 ? true : false,
                                        },
                                        contact_person:req.body.contactperson,
                                        name:req.body.name,
                                        phone_no: req.body.phone_no,
                                        type_of_cusines: req.body.type_of_cusines,
                                        services: {
                                            delivery: req.body.services1 ? true : false,
                                            walkin: req.body.services2 ? true : false,
                                        },
                                        specify: req.body.specify,
                                        time_from: req.body.time_from,
                                        time_to: req.body.time_to,
                                        image: req.file.filename
                    }
                
                    Partner.create(obj, (err,item)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                           res.redirect('/submitted');
                            
                        }
                    });
            path = req.file.path
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.USER,
                  pass: process.env.PASS
                }
              });
              
              const output = `
                    <p>You have a new contact request</p>
                    <h3>Contact Details</h3>
                    <ul>  
                      <li>Outlet Name: ${req.body.outletName}</li>
                      <li>State: ${req.body.state}</li>
                      <li>City: ${req.body.city}</li>
                      <li>Primary Location: ${req.body.primary_location}</li>
                      <li>Pincode: ${req.body.pincode}</li>
                      <li>Contact Person: ${req.body.contactperson}</li>
                      <li>Name: ${req.body.name}</li>
                      <li>Phone Number: ${req.body.phone_no}</li>
                      <li>Type Of Cusines: ${req.body.type_of_cusines}</li>
                      <li>Time-From: ${req.body.time_from}</li>
                      <li>Time-To: ${req.body.time_to}</li>
                      <li>Services(delivery): ${req.body.services1 ? true : false}</li>
                      <li>Services(Walk-In): ${req.body.services2 ? true : false}</li>
                      <li>Outlet Type(Cloud Kitchen): ${req.body.outlettype1 ? true : false}</li>
                      <li>Outlet Type(Resturent): ${req.body.outlettype2 ? true : false}</li>
                      <li>Outlet Type(Others): ${req.body.outlettype3 ? true : false}</li>
                      <li>Outlet Type(If Others, Please specify): ${req.body.specify}</li>
                    </ul>
                  `;

              var mailOptions = {
                from: process.env.USER,
                to: process.env.USER,
                subject:'Adding services request',
                text:'mail',
                html: output,
                attachments: [
                  {
                   path: path
                  }
               ]
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  fs.unlink(path,function(err){
                    if(err){
                        return res.end(err)
                    }else{
                        console.log("deleted")
                    }
                  })
                }
              });
        }
    })
})

  
module.exports = router;
