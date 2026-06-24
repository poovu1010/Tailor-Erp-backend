const mongoose = require('mongoose')
const MimeNode = require('nodemailer/lib/mime-node')

const OTPSchema = mongoose.Schema({
    Customer_id:{
    type:mongoose.Schema.Types.ObjectId,
        ref:'customerDetails',
        unique:true
    },

    Email:{
        type:String,
        Required:true
    },
    OTP:{
        type:Number,
        Required:true
    },
    OTPExpiry:{
        type:Number,
        Required:true
    }
})

exports.OrderCkeckOtpModel = mongoose.model('OrderCkeckOTP',OTPSchema);