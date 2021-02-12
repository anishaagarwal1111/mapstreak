const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const tiffinServices = require('./data/tiffinServices');
const Tiffin = require('./models/tiffinServiceModel');
const connectDB = require('./config/db');


dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Tiffin.deleteMany();
        await Tiffin.insertMany(tiffinServices);
        console.log('Data imported!'.green.inverse);
        process.exit();
        
        }  
       
     catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
      
        await Tiffin.deleteMany();
        

        console.log('Data imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}