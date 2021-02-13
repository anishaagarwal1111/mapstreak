const jwt = require('jsonwebtoken');

const auth = async(req,res,next) => {
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

module.exports = auth;

// const jwt = require('jsonwebtoken');
// const asyncHandler = require('express-async-handler');
// const User = require('../models/User');

// // json web token is verified
// const auth = asyncHandler(async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   )
//     try {
//       token = req.headers.authorization.split(' ')[1].toString();
//       const decodedToken = jwt.verify(token, 'mapstreak-merchant');
//       req.user = await User.findById(decodedToken.id).select('-password');
//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//     }
//   if (!token) {
//     res.status(401);
//     res.json({message :"invalid token"});
//   }
// });

// module.exports = authRequire;

// const authRequire = (req, res, next) => {
//     try {
//         const token = req.header("Authorization")
//         if(!token) return res.status(400).json({msg: "Invalid Authentication."})

//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//             if(err) return res.status(400).json({msg: "Invalid Authentication."})

//             req.user = user
//             next()
//         })
//     } catch (err) {
//         return res.status(500).json({msg: err.message})
//     }
// }

// module.exports = authRequire

