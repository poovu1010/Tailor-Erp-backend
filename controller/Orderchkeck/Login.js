const mongoose = require('mongoose');
const { CustomerModel } = require('../../models/CustomerModel');
const { OrderCkeckOtpModel } = require('../../models/OrederCheckOTPModel');
const { OtpModel } = require('../../models/OtpModel');
const { sendMailer } = require('../../utils/Mailer');
const jwt = require('jsonwebtoken')

exports.LoginController = async (req, res, next) => {

    try {
        
        const { email } = req.body
    
        const IsEmailAleradyExists = await CustomerModel.findOne({ Gmail: email })
        console.log(IsEmailAleradyExists)

        // NOT EXISTS
        if (!IsEmailAleradyExists) {
            return res.status(404).json({
                message: "User Not found",
                status: false
            })
        }

        // Already has a Opt to desroy
        const DestroyOtp = await OrderCkeckOtpModel.findOneAndDelete({ Email: email })
        console.log(DestroyOtp)


        // OTP GENERATION

        const generateOTP = Math.floor(100000 + Math.random() * 900000)
        const ExprireOtp = Date.now() + 1000 * 60 * 5;

        await sendMailer(email, "", generateOTP)

        const LoginData = new OrderCkeckOtpModel({
            Customer_id: IsEmailAleradyExists._id,
            Email: email,
            OTP: generateOTP,
            OTPExpiry: ExprireOtp
        });

        const dataSave = await LoginData.save();
        console.log(dataSave)

        res.status(201).json({
            message: "OTP Generated",
            status: true
        })

    } catch (error) {
        next(error)
    }

}

exports.VerifyOtpController = async (req, res, next) => {

    try {
        const { email, otp } = req.body;
        
        const IsEmailAleradyExists = await OrderCkeckOtpModel.findOne({Email:email})

         if (!IsEmailAleradyExists) {
            return res.status(404).json({
                message: "Somthing went wrong",
                status: false
            })
        }

        const IsExpired  = Date.now()

        // JwtCreation
        const token = jwt.sign({
            Email:email,
            Role:"User",
            UserId:IsEmailAleradyExists._id},
            process.env.JWT_SECRET_KEY)

        // CheckEmail
        if (IsEmailAleradyExists.OTP === Number(otp) && IsEmailAleradyExists.OTPExpiry > IsExpired) {
         return res.status(200).cookie('jwt',token,{
            maxAge: 1000*60*60*24*7
         }).json({
            message:"login Successfully",
            status:true
         })   
        }else if (IsEmailAleradyExists.OTPExpiry < IsExpired){
            return res.status(400).json({
            message:"Enter valid Otp",
            status:false
         })
        }else{
             return res.status(400).json({
            message:"Enter valid Otp ",
            status:false
             })
        }
    } catch (error) {
        next(error)
    }

}