const mongoose = require('mongoose');

const OtpSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    otp:{
        type:Number,
        required:true,
    },
    otpExpiry:{
        type:Number,
        required:true
    },
    OwnerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'AdminUsers',
        unique:true
    }

})

exports.OtpModel = mongoose.model("Otp",OtpSchema)