const nodeMail = require('nodemailer')

const mailerInfo = nodeMail.createTransport({
    service:'gmail',
    
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
        
    
})

exports.sendMailer = async (to,subject,message) => {
    console.log("ji")
    await mailerInfo.sendMail({
        from:process.env.EMAIL_USER,
        to:to,
        subject:"OTP VERIFICATION - StitchFlow",
        html:`<p>your OTP-${message}</p>`
    })
    console.log("hi")
    
}


// module.exports ={sendMailer};