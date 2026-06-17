const { mongoose } = require("mongoose");
const { AdminModel } = require("../models/ShopOwnerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { json } = require("express");

const createJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
};

exports.ownerSignupController = async (req, res,next) => {
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

    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60, secure: false })

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

exports.ownerLoginController = async (req, res,next) => {

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
    ///////////////////////////////////

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

    const token = createJwt(isEmailexists._id, isEmailexists.email, isEmailexists.role);
    const decode_token = jwt.verify(token, process.env.JWT_SECRET_KEY)
    console.log(decode_token)
    res.status(200)
      .cookie("jwt", token, { maxAge: 1000 * 60 * 60 })
      .json({ message: "logined Succesfully", decode_token, success: true });
  } catch (error) {
    next(error)
  }
};






exports.OwnerLogoutController = async (req, res) => {
  try {
    // res.status(200).cookie("jwt","",{maxAge:1000*1}).json("logout Succes")
    res.clearCookie("jwt").json({
      message:"Logout Succes"
    });
  } catch (error) {
    console.log(error);
    next(error)
  }
};










