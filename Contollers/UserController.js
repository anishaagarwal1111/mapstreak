
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//create token
const maxAge = 1 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, 'mapstreak', {
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
module.exports.get_signup = async (req,res)=>
{
  res.render('signup');
}


module.exports.post_signup = async(req,res)=>
{
  const {full_name,address,mobile_no,email,password}=req.body;
  try{
       const user=await User.create({full_name,address,email,password,mobile_no});
       const token =createToken(user._id);
       res.cookie('jwt',token,{ httpOnly: true, maxAge: maxAge * 1000 })
       if(user){
         res.status(201);
         res.json({
           _id:user._id,
           full_name:user.full_name,
           address: user.organisation_name,
           mobile_no:user.mobile_no,
           password:user.password,
           email:user.email,   
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
module.exports.get_login = async(req,res) => {
 res.render('login');
}

module.exports.post_login = async (req,res) => {
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