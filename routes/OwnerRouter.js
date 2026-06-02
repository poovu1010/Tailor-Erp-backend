const express = require("express");
const {
  ownerSignupController,
  ownerLoginController,
  OwnerLogoutController,
} = require("../controller/OwnerController");
const { verifiedUser } = require("../middleware/authentication");
const { createCustomer, getAllCustomers, getSingleCustomer, updateCustomer, deleteCustomer } = require("../controller/CustomerController");
const { verify } = require("jsonwebtoken");
const { CreateOrder, GetAllorders } = require("../controller/OrderController");

const ownerRouter = express.Router();

ownerRouter.post("/Signup", ownerSignupController);
ownerRouter.post("/login", ownerLoginController);
ownerRouter.post("/logout", OwnerLogoutController);


ownerRouter.post("/newCustomer",verifiedUser,createCustomer)
ownerRouter.get("/get-all-user",verifiedUser,getAllCustomers)
ownerRouter.get("/get-single-customer/:id",verifiedUser,getSingleCustomer)
ownerRouter.put("/updateCustomer/:id",verifiedUser,updateCustomer)
ownerRouter.delete("/deleteCustomer/:id",verifiedUser,deleteCustomer)


ownerRouter.post("/uploade_profile",verifiedUser,)


ownerRouter.post("/newOrder",verifiedUser,CreateOrder)
ownerRouter.get("/get-all-order",verifiedUser,GetAllorders)

ownerRouter.get("/Verify",verifiedUser,(req,res)=>{
  res.status(200).json({
    message:"authorized",
    status:true
  })
})

module.exports = { ownerRouter };
