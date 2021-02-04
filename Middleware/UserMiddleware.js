const jwt = require('jsonwebtoken');

const authRequire = async (req,res,next) => {
    const token = req.cookies.jwt;

// json web token is verified
if(token){
    jwt.verify(token, 'mapstreak', (err,decodedToken) => {
        if(err){
            res.redirect('/login');
        }
        else{
            console.log(decodedToken)
            next();
        }
    });
}
else{
    res.redirect('/login');
}
}

module.exports = authRequire;

