exports.globalErrorHandler =(error,req,res,next)=>{

    console.log(error)
    res.json(error)

}