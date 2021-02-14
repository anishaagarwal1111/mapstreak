
const jwt = require('jsonwebtoken');
const Merchant = require('../models/merchantModel');
const nodemailer = require('nodemailer');


//create token
const maxAge = 1 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, 'mapstreak-merchant', {
    expiresIn: maxAge,
    });
};
//error handling
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '', mobile_no: '', confirmPassword: ''};

  if(err.message === "password does not match"){
     errors.confirmPassword = "Password did not match";
  }

  if (err.code === 11000) {
          errors.email = 'That email is already registered';
      return errors;
  }

  if(err.message === "invalid Email id"){
    errors.email = "Please enter a valid Email ID";
  }
  
  if(err.mobile_no === "invalid mobile number"){
    errors.mobile_no = "Please enter a valid mobile number";
  }

  if(err.message === "incorrect password"){
    errors.password = "Password is incorrect";
    
  }


  if (err.message.includes('Merchant validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
return errors;
}


//signup
module.exports.merchant_get_signup = async (req,res)=>
{
  res.render('merchant_signup');
}


module.exports.merchant_post_signup = async(req,res)=>
{
  const {full_name,address,mobile_no,email,password,confirmPassword}=req.body;
  try{
      const check = await Merchant.check(password, confirmPassword);
       const merchant=await Merchant.create({full_name,address,email,password,mobile_no,confirmPassword});
       const token = createToken(merchant._id);
       res.cookie('jwt',token,{ httpOnly: true, maxAge: maxAge * 1000 })
         res.status(201);
         res.json({
          _id:merchant._id,
          name:merchant.full_name,
          password:merchant.password,
          email:merchant.email,  
          mobile_no:merchant.mobile_no,  
          address:merchant.address, 
          confirmPassword:merchant.confirmPassword, 
        });
        }
    catch(err)
    {
      const errors = handleErrors(err);
      res.status(400).json({errors});
    }
 
}



//login
module.exports.merchant_get_login = async(req,res) => {
 res.render('merchant_login');
}

module.exports.merchant_post_login = async (req,res) => {
    const {email, password} = req.body;
    try{
      const merchant = await Merchant.login(email,password);
      const token = createToken(email);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
       res.status(201).json({
         _id : merchant._id,
         password: merchant.password,
         email: merchant.email
       });  
      }
        catch(err){
          const errors = handleErrors(err);
          res.status(400).json({errors});
        }
  }