
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');



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
    errors.email = "Invalid Email ID";
   
  }

  if(err.message === "incorrect password"){
    errors.password = "Password is incorrect";
    
  }


  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
return errors;
}


//signup

module.exports.post_signup = async(req,res)=>
{
  const {name,email,password}=req.body;
  try{
       const user=await User.create({name,email,password});
       const token =createToken(user._id);
       res.cookie('jwt',token,{ httpOnly: true, maxAge: maxAge * 1000 })
       if(user){
         res.status(201);
         res.json({
           _id:user._id,
           name:user.name,
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
      const token = createToken(user._id);
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


module.exports.get_forgotpassword = async(req,res) => {
  res.render('forgotpassword');
}

module.exports.post_forgotpassword = async(req,res) =>{
    try{
      const {email} = req.body;
      const user =  await User.findOne({email});
      if(!user){
        res.json({message: "This email id does not exists"});
      }
     const token = createToken({_id: user._id});  
     var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.USER,
              pass: process.env.PASS
            },
          });
      
          var mailOptions = {
            from: process.env.USER,
            to: user.email,
            subject:'Forgot password Request',
            text:'mail',
            html: `
             <h2>Please click on the link to  reset your password</h2>
             <p>${process.env.CLIENT_URL}/reset-password/${token}</p>
            `
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        }
        catch(err){
          console.log(err);
        }
      }

module.exports.get_resetpassword = async(req,res) => {
  res.render('resetpassword');
}  

module.exports.post_resetpassword = async(req,res) => {
  try{
  const {newPassword} = req.body;
  const passwordHash = await bcrypt.hash(newPassword, 12)

  await User.findOneAndUpdate({_id: req.user.id},{
    password: passwordHash
  });
  res.json({message: "password succesfully changed"});
}
catch(err){
  console.log(err);
}

}

