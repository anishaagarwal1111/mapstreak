const express = require("express");
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const colors = require('colors');
var Partner = require('./models/partnerModel');
const partnerRoute = require('./routes/partnerRoute');
var mongoose = require('mongoose');
const UserRoute=require('./routes/UserRoute');
const MerchantRoute=require('./routes/MerchantRoute');
var Merchant=require('./models/merchantModel')
var requireAuth = require('./Middleware/MerchantMiddleware');




dotenv.config();
connectDB();
var app = express()
app.use(express.static('public'));
app.use(express.json());

app.use(partnerRoute);
app.use(UserRoute);
app.use(partnerRoute);
app.use(MerchantRoute);
app.set("view engine", "ejs");



app.get('/', (req, res) => {
  res.render('home');
});

app.get('/aboutus',(req,res) => {
    res.render('aboutus');
});

app.get('/contactus',(req,res) => {
    res.render('contactus');
});

app.get('/submitted', (req,res)=>{
  res.render('submitted');
});


app.get('/privacypolicy',(req,res) => {
 res.render('privacy_policy');
});

app.get('/termsandconditions', (req,res) => {
  res.render('terms_and_conditions');
});

app.get('/tiffinservices', (req,res) => {
  res.json(tiffinServices);
})

app.get('/partnerwithus', requireAuth, (req,res) => {
  res.render('joinus');
})



PORT = process.env.PORT;

app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`));
