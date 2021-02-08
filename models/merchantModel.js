const mongoose=require("mongoose");

const merchantSchema = new mongoose.Schema
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
        // validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter a password'],
    },
    confirmPassword:{
        type: String,
        required: [true, 'Please enter a password'],
    }

});
const Merchant = mongoose.model('Merchant', merchantSchema);

module.exports = Merchant;