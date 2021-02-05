const mongoose=require("mongoose");

const userSchema=new mongoose.Schema
({

    full_name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    mobile_no:{
        type:Number,
        required:true

    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique:true,
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'],
    }

});
const User= mongoose.model('User', userSchema);

module.exports = User;