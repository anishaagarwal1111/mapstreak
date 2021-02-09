const jwt = require('jsonwebtoken');

const requireAuth = async (req,res,next) => {
    const token = req.cookies.jwt;

// json web token is verified
if(token){
    jwt.verify(token, 'mapstreak-merchant', (err,decodedToken) => {
        if(err){
            res.redirect('/merchant_login');
        }
        else{
            console.log(decodedToken)
            next();
        }
    });
}
else{
    res.redirect('/merchant_login');
}
}

module.exports = requireAuth;

