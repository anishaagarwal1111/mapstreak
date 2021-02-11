// const jwt = require('jsonwebtoken');
// const Merchant = require('../models/merchantModel');

// const requireAuth = async (req,res,next) => {
//     const token = req.cookies.jwt;

// // json web token is verified
// if(token){
//     jwt.verify(token, 'mapstreak-merchant', (err,decodedToken) => {
//         if(err){
//             res.redirect('/merchant_login');
//         }
//         else{
//             console.log(decodedToken)
//             next();
//         }
//     });
// }
// else{
//     console.log('token not verified');
//     // res.redirect('/merchant_login');
// }
// }

// // const currentUser = (req,res,next) => {
// //     const token = req.cookies.jwt;
// //     if(token){
// //         jwt.verify(token, 'mapstreak-merchant', async (err, decodedToken) => {
// //             if(err){
// //                 console.log(err.message);
// //                 res.locals.merchant = null;
// //                 next();
// //             } else{
// //                 console.log(decodedToken);
// //                 let merchant = await Merchant.findById(decodedToken.id);
// //                 res.locals.merchant = merchant;
// //                 next();
// //             }
// //         });
// //     }
// //     else{
// //        res.locals.merchant = null;
// //        next();
// //     }
// // }

// module.exports = requireAuth;

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Merchant = require('../models/merchantModel');

// json web token is verified
const requireAuth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    try {
      token = req.headers.authorization.split(' ')[1].toString();
      const decodedToken = jwt.verify(token, 'mapstreak-merchant');
      req.user = await Merchant.findById(decodedToken.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      res.redirect('/merchant_signup')
    }
  if (!token) {
    res.status(401);
    res.redirect('/merchant_signup')
  }
});

module.exports = requireAuth;
