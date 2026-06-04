const mongoose = require("mongoose");

exports.shopCreateControlller = async (req, res,next) => {
  try {

    const { shopName,phoneNumber, Address, pincode } = req.body;

    const shopdetail = new ShopModel({
      shopName,
      OwnerId:req.user.Id,
      phoneNumber,
      Address,
      pincode,
    });
    await shopdetail.save();

    res.status(201).json({
      succes: true,
      message: "shop created",
      data: shopdetail,
    });
  } catch (err) {
    console.log(err);
    next(err)
  }
};
