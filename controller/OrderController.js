const mongoose = require("mongoose");
const { ordersModel } = require("../models/OrdersCollection");

exports.CreateOrder = async (req, res) => {
    try{

    const {
        customerId,
        clothType,
        price,
        advancePaid,
        expectedDeliveryDate
    } = req.body
    const userId = req.user
    console.log(userId)
     const orderDetail = new ordersModel({
        shopId:userId,
      customerId,
        clothType,
        price,
        advancePaid,
        expectedDeliveryDate
    });
    await orderDetail.save();

    res.status(201).json({
      succes: true,
      message: "order created",
      data:orderDetail,
    });
  } catch (err) {
    console.log(err);
  }
}

exports.GetAllorders = async (req,res) => {
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
        res.json(error)
    }
}