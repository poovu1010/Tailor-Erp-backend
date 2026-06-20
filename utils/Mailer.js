const nodeMail = require('nodemailer')

const mailerInfo = nodeMail.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
   connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


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