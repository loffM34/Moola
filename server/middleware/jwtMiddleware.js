const jwt = require('jsonwebtoken')

function authenticateToken(req,res,next){
    //get token from authoricaiton header
    const token = req.headers['authorization']?.split('')[1];

    if(!token){
        return res.status(401).json({error:'Unauthorized'})
    }

    //verify token
    jwt.verify(token,process.env.JWT_SECRET,(err,decodedToken) => {
        if(err){
            return res.status(403).json({error:'Forbidden'})
        }
        //attach decoded token to request object
        req.user = decodedToken;
        next();
    })

}

module.exports = {authenticateToken}