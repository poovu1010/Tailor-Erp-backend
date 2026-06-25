const express = require("express");
const {
  ownerSignupController,
  ownerLoginController,
  OwnerLogoutController,
  VerifyOtp,
} = require("../controller/OwnerController");
const { verifiedUser } = require("../middleware/authentication");
const { createCustomer, getAllCustomers, getSingleCustomer, updateCustomer, deleteCustomer } = require("../controller/CustomerController");
const { verify } = require("jsonwebtoken");
const { CreateOrder, GetAllorders, UpdateOrderStatus, GetSingleOrder } = require("../controller/OrderController");
const { LoginController, VerifyOtpController, getCustomerOrder, logout } = require("../controller/Orderchkeck/Login");

const ownerRouter = express.Router();
const OrderCheck = express.Router();

OrderCheck.post("/login",LoginController)
OrderCheck.post("/Verify-Otp",VerifyOtpController)
OrderCheck.get("/OrderInfo",verifiedUser,getCustomerOrder)
OrderCheck.post("/logout",logout)


ownerRouter.post("/Signup", ownerSignupController);
ownerRouter.post("/login", ownerLoginController);
ownerRouter.post("/Verify-otp",VerifyOtp)
ownerRouter.post("/logout", OwnerLogoutController);


ownerRouter.post("/newCustomer",verifiedUser,createCustomer)
ownerRouter.get("/get-all-customer",verifiedUser,getAllCustomers)
ownerRouter.get("/get-single-customer-allInfo/:id",verifiedUser,getSingleCustomer)
ownerRouter.put("/updateCustomer/:id",verifiedUser,updateCustomer)
ownerRouter.delete("/deleteCustomer/:id",verifiedUser,deleteCustomer)


ownerRouter.post("/uploade_profile",verifiedUser,)
ownerRouter.post("/newOrder",verifiedUser,CreateOrder)
ownerRouter.get("/get-all-order",verifiedUser,GetAllorders)
ownerRouter.get("/getSingle-order/:Orderid",verifiedUser,GetSingleOrder)
ownerRouter.patch("/update-status/:Orderid",UpdateOrderStatus)

ownerRouter.post("/Verify",verifiedUser,(req,res)=>{
  res.status(200).json({
    message:"authorized",
    status:true
  })
})




module.exports = { ownerRouter,OrderCheck };
