
const jwt = require('jsonwebtoken');

//create token
const maxAge = 1 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, 'mapstreak', {
    expiresIn: maxAge,
    });
};


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