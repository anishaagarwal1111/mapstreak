const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const tiffinServices = require('./data/tiffinSerices');
const Tiffin = require('./models/tiffinSericeModel');
const connectDB = require('./config/db');


dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Tiffin.deleteMany();

        const createdUser = await tiffinServices.insertMany(tiffinServices);

        const adminUser = createdUser[0]._id;
        
        console.log('Data imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}