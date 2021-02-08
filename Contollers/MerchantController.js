
const jwt = require('jsonwebtoken');
const Merchant = require('../models/merchantModel');

//create token
const maxAge = 1 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, 'mapstreak-merchant', {
    expiresIn: maxAge,
    });
};
//error handling
//error handling
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: ''};

  if (err.code === 11000) {
          errors.email = 'that email is already registered';
      return errors;
  }

  if(err.message === "invalid Email id"){
    errors.employe_id = "Please enter a valid Email ID";
   
  }

  if(err.message === "incorrect password"){
    errors.password = "Password is incorrect";
    
  }


  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
return errors;
}


//signup
module.exports.merchant_get_signup = async (req,res)=>
{
  res.render('joinus');
}


module.exports.merchant_post_signup = async(req,res)=>
{
  const {full_name,address,mobile_no,email,password,confirmPassword}=req.body;
  try{
       const merchant=await Merchant.create({full_name,address,email,password,mobile_no,confirmPassword});
       const token =createToken(merchant._id);
       res.cookie('jwt',token,{ httpOnly: true, maxAge: maxAge * 1000 })
       if(merchant){
         res.status(201);
         res.json({
           _id:merchant._id,
           full_name:merchant.full_name,
           address: merchant.organisation_name,
           mobile_no:merchant.mobile_no,
           password:merchant.password,
           confirmPassword:merchant.confirmPassword,
           email:merchant.email,   
         });
       }

       else{
        res.status(400);
        throw new Error ('Invalid details');   
       }

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
      const user = await User.login(email,password);
      const token = createToken(email);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
       res.status(201).json({
         _id : user._id,
         password: user.password,
         email: user.email
       });  
      }
        catch(err){
          const errors = handleErrors(err);
          res.status(400).json({errors});
        }
  }