const mongoose=require("mongoose");
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

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
        required:true,
        unique:true

    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique:true,
        validate: [isEmail, 'Please enter a valid email']
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
//bcrypting password
merchantSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);

    next();
});
merchantSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.confirmPassword=await bcrypt.hash(this.confirmPassword,salt);
    next();
});


//static login
merchantSchema.statics.login = async function(mobile_no, password){
    const merchant = await this.findOne({mobile_no});
    if (merchant){
  const auth = await bcrypt.compare(password, merchant.password);
  if(auth){
      return merchant;
  }
  throw Error('incorrect password');
    }
    throw Error('invalid mobile number');
}

merchantSchema.statics.check = async function(password, confirmPassword){
    if(password == confirmPassword){
        return;
    }
     throw Error('password does not match')
}

const Merchant = mongoose.model('Merchant', merchantSchema);

module.exports = Merchant;