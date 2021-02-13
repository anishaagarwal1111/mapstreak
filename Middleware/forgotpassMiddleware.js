const jwt =require('jsonwebtoken');

const authRequire = (req, res, next) => {
    try {
        const token = req.header("Authorization")  
        if(!token) return res.status(400).json({msg: "Session Expired"})
       // res.render('authentication falied);
        jwt.verify(token, 'mapstreak', (err, user) => {
            if(err) return res.status(400).json({msg: "Authentication falied"})
            //res.render('authentication falied');

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authRequire;