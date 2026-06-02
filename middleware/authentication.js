const jwt = require('jsonwebtoken');

exports.verifiedUser = async(req,res,next)=>{

    try {
        console.log("hi")
    const token = req.cookies.jwt
    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
    console.log("protected route")
    console.log(decode)
    if(!token){
        
      return res.status(401).json({
            message:"unauthorized User",
            status:false
        })
    }
     req.user = decode.id;
   

    next()
        
    } catch (error) {
        console.log(error)
        res.status(401).json(error.name)
    }
   
    

   
}