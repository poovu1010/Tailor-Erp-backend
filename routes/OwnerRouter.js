const express = require("express");
const {
  ownerSignupController,
  ownerLoginController,
  OwnerLogoutController,
} = require("../controller/OwnerController");
const { verifiedUser } = require("../middleware/authentication");
const { createCustomer } = require("../controller/CustomerController");
const { verify } = require("jsonwebtoken");

ownerRouter = express.Router();

ownerRouter.post("/Signup", ownerSignupController);
ownerRouter.post("/login", ownerLoginController);
ownerRouter.post("/logout", OwnerLogoutController);


ownerRouter.post("/newCustomer",verifiedUser)

module.exports = { ownerRouter };
