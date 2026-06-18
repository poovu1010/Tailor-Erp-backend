const mongoose = require("mongoose");
const { ordersModel } = require("../models/OrdersCollection");

exports.CreateOrder = async (req, res, next) => {
  try {
    const {
      customerId,
      clothType,
      price,
      advancePaid,
      expectedDeliveryDate,
      status,
      notes,
    } = req.body;

    const userId = req.user;

    // Calculation due
    const totalAmount = Number(price);
    const advance = Number(advancePaid);

    const balanceAmount = totalAmount - advance;

    const paymentStatus =
      balanceAmount === 0 ? "paid" : "due";

    const orderDetail = new ordersModel({
      shopId: userId,
      customerId,
      clothType,
      price: totalAmount,
      advancePaid: advance,
      balanceAmount,
      paymentStatus,
      status,
      expectedDeliveryDate,
      notes,
    });

    await orderDetail.save();

    res.status(201).json({
      success: true,
      message: "Order created",
      data: orderDetail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};


exports.GetAllorders = async (req, res, next) => {
  try {

    const allorders = await ordersModel.aggregate([{
      $match: {
        shopId: new mongoose.Types.ObjectId(req.user)
      }
    }, {
      $facet: {
        OrderDetails: [
          {
            $lookup: {
              from: "customerdetails",
              localField: "customerId",
              foreignField: "_id",
              as: "CustomerDetail"
            }
          },
           {
            $unwind: "$CustomerDetail"
          },
        ],

        stats: [
          {
            $group: {
              _id: null,
              TotalOrders: { $sum: 1 },
              TotalQueue: {
                $sum: {
                  $cond: [{ $eq: ["$status", "Queue"] }, 1, 0]
                }
              },
              TotalStitching: {
                $sum: {
                  $cond: [{ $eq: ["$status", "Stitching"] }, 1, 0]
                }
              },
              TotalReady: {
                $sum: {
                  $cond: [{ $eq: ["$status", "Ready"] }, 1, 0]
                }
              },
              TotalDelivery: {
                $sum: {
                  $cond: [{ $eq: ["$status", "Delivered"] }, 1, 0]
                }
              },
              TotalProcessing:{
                $sum:{
                  $cond: [{$eq:["$status","Processing"]},1,0]
                }
              }
            }
          }
        ],


      }
    }


    ])
    console.log(allorders)
    res.status(200).json({
      status: "success",
      data: allorders[0].OrderDetails,
      stats: allorders[0].stats
    })
  } catch (error) {
    next(err)
  }
}

exports.UpdateOrderStatus = async (req, res, next) => {
  try {
    const { Orderid } = req.params;
    const { Status, receivedAmount = 0 } = req.body;

    const order = await ordersModel.findById(Orderid);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (Status === "Delivered") {
      const received = Number(receivedAmount);

      order.receivedAmount = received;
      order.balanceAmount =
        Number(order.price) - (Number(order.advancePaid) + received);

      order.paymentStatus =
        order.balanceAmount === 0 ? "paid" : "due";
    }

    order.status = Status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

exports.GetSingleOrder = async (req, res) => {
  try {
    console.time("start")
    const userId  = req.user;
    const {Orderid} = req.params;

    const GetAllDetail = await ordersModel.aggregate([{
      $match:{
        _id:new mongoose.Types.ObjectId(Orderid),
        shopId:new mongoose.Types.ObjectId(req.user)
        
      }
    },
    {
      $lookup:{
        from:"customerdetails",
        localField:"customerId",
        foreignField:"_id",
        as:"CustomerDetail"
      }
    },
    {
        $unwind:"$CustomerDetail"
      }
  ])

  console.timeEnd("start")
    

  res.status(200).json({
    message:"Succesfully fetched",
    status:"true",
    data: GetAllDetail
  })


  } catch (error) {
    console.log(error)
  }


}