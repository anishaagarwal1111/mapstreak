const mongoose=require("mongoose");
const bcrypt = require("bcrypt");
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema
({
    name:{
        type:String,
        
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
    resentToken: String,
    expireToken: Date
    


});

// bcrypting password
userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
});


//static login
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if (user){
  const auth = await bcrypt.compare(password, user.password);
  if(auth){
      return user;
  }
  throw Error('incorrect password');
    }
    throw Error('invalid Email id');
}

const User= mongoose.model('User', userSchema);

module.exports = User;