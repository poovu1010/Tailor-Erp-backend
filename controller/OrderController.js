const mongoose = require("mongoose");
const { ordersModel } = require("../models/OrdersCollection");

exports.CreateOrder = async (req, res,next) => {
    try{

    const {
        customerId,
        clothType,
        price,
        advancePaid,
        expectedDeliveryDate,
        status,
        notes
    } = req.body
    const userId = req.user
   
     const orderDetail = new ordersModel({
      shopId:userId,
       customerId,
        clothType,
        price,
        advancePaid,
        status,
        expectedDeliveryDate,
        notes
    });
    await orderDetail.save();

    res.status(201).json({
      succes: true,
      message: "order created",
      data:orderDetail,
    });
  } catch (err) {
    console.log(err);
    next(err)
  }
}

exports.GetAllorders = async (req,res,next) => {
    try {
        
        const allorders =await ordersModel.find({
            shopId:req.user
        }).populate("customerId")
        console.log(allorders)
        res.status(200).json({
            status:"success",
            allorders
        })
    } catch (error) {
       next(err)
    }
}