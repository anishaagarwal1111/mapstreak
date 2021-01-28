const express = require("express");
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const colors = require('colors');
const partnerRoute = require('./routes/partnerRoute');

dotenv.config();

connectDB()
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(partnerRoute);

app.set('view engine', 'ejs');



app.get('/',(req,res) => {
    res.render('home');
});

PORT = process.env.PORT;

app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`));
