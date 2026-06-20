const { mongoose } = require("mongoose");
const { AdminModel } = require("../models/ShopOwnerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { json } = require("express");
const { OtpSchem, OtpModel } = require("../models/OtpModel");
const { sendMailer } = require("../utils/Mailer");

const createJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
};

exports.ownerSignupController = async (req, res, next) => {
  try {
    console.log(req.body);
    const { userName, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminData = new AdminModel({
      userName,
      email,
      password: hashedPassword,
      role,
    });
    await adminData.save();

    console.log(adminData._id);


    const token = createJwt(adminData._id, adminData.email, adminData.role)

    res
      .status(200)
      .cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60,
        path: "/",
      })


    res.status(201).json({
      success: true,
      message: "Owner created Successfully",
      data: adminData,
    });
  } catch (error) {
    console.log(error);
    next(error)
  }
};

exports.ownerLoginController = async (req, res, next) => {

  try {

    const { email, password } = req.body;
    // if new User
    const isEmailexists = await AdminModel.findOne({ email });
    console.log(isEmailexists)




    if (!isEmailexists) {
      return res.status(400).json({
        success: false,
        message: "Email or Password Something went Wrong",
      });
    }


    // check password
    const isCorrectPassword = await bcrypt.compare(
      password,
      isEmailexists.password,
    );

    if (!isCorrectPassword) {
      return res.status(400).json({
        success: false,
        message: "Email or Password Something went Wrong",
      });
    }

    if (isEmailexists) {
      console.log("hi")
      await OtpModel.findOneAndDelete({
        OwnerId: isEmailexists._id
      })
    }

    // Otp Generation
    const GenerateOtp = Math.floor(100000 + Math.random() * 900000);
    console.log(GenerateOtp)
    // set Expity
    const expiryTime = Date.now() + 1000 * 60 * 5;

    // put in Collection
    const OtpData = OtpModel({
      email,
      otp: GenerateOtp,
      otpExpiry: expiryTime,
      OwnerId: isEmailexists._id
    })
    // send otp to mail
    

   const saved = await OtpData.save()
   console.log(saved)
    await sendMailer(email,"otp-verification",GenerateOtp);
  
    res.status(200).json({
      message:`otp sent to ${email}`,
      Success:true
    })



  } catch (error) {
    next(error)
  }
};


exports.VerifyOtp = async (req, res, next) => {
  try {
    console.log("req is come")
  const { email, otp } = req.body;
  const curentTime = Date.now()

  // find Mail
  const isEmailexists = await OtpModel.findOne({ email })

  if (!isEmailexists) {
    return res.status(200).json({
      message: "Something Went Wrong",
      success: false
    })
  }


  if (isEmailexists.otp === Number(otp) && isEmailexists.otpExpiry > curentTime) {
    console.log("otp true")

     const GetOwnerDetail = await AdminModel.findOne({ email });
    // jwt Token creation
    const token = createJwt(GetOwnerDetail._id, GetOwnerDetail.email, GetOwnerDetail.role);
    const decode_token = jwt.verify(token, process.env.JWT_SECRET_KEY)

    return res.status(200).cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60,
        path: "/",
      }).json({
        message: "Login successfully",
        decode_token,
        success: true,
      });
  }
  if (isEmailexists.otp === Number(otp) && isEmailexists.otpExpiry < curentTime) {
    console.log("expired")
    return res.status(400).json({
      message:"Otp is expired",
      success:false
    })
  }

  return res.status(400).json({
      message:"Invalid OTp",
      success:false
  })
 } catch (error) {
    next(error)
  }

}






exports.OwnerLogoutController = async (req, res, next) => {
  try {
    return res
      .status(200)
      .clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Logout success",
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};





