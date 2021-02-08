const mongoose=require("mongoose");

const tiffinSchema = new mongoose.Schema
({

 _id:{
     type:Number
 },
 name:{
     type: String
 },
 location:{
     type: String
 },
 Rating:{
     type:Number
 }

});
const Tiffin= mongoose.model('Tiffin', tiffinSchema);

module.exports = Tiffin;