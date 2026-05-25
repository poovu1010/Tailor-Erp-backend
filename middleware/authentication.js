const jwt = require('jsonwebtoken');

exports.verifiedUser = async(req,res,next)=>{
    const token = req.cookies.jwt
    if(!token){
        
      return res.status(401).json({
            message:"unauthorized User",
            status:false
        })
    }
    
    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
    res.send("verifyied")

    req.user = decode.id;

    next()
}