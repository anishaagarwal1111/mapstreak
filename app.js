const express = require("express");
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const colors = require('colors');

dotenv.config();

connectDB()
const app = express();
app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');

app.get('/',(req,res) => {
    res.render('home');
});

PORT = process.env.PORT;

app.listen(PORT, ()=> console.log(`Server started at port ${PORT}`));
