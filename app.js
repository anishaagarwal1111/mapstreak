const express = require("express");
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const colors = require('colors');
var Partner = require('./models/partnerModel');
// const partnerRoute = require('./routes/partnerRoute');
var mongoose = require('mongoose');


dotenv.config();
connectDB();
var app = express()
app.use(express.static('public'));
app.use(express.json());

// app.use(partnerRoute);
app.set("view engine", "ejs");

var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });



app.get('/', (req, res) => {
  res.render('home');
});

app.get('/partnerwithus', (req,res) => {
    res.render('joinus');
})
app.post('/partnerwithus', upload.single('image'),(req, res) => {
 
    var obj = {
        outletName: req.body.outletName,
        state: req.body.state,
        city: req.body.city,
        name: req.body.name,
        pincode: req.body.pincode,
        phone_no: req.body.phone_no,
        primary_location: req.body.primary_location,
        contactperson: req.body.contactperson,
        type: req.body.type,
        image: req.file.filename
    }
    Partner.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
          res.redirect('/');
        }
    });
});


PORT = process.env.PORT;

app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`));
