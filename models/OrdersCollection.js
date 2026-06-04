const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shops",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customerDetail",
      required: true,
    },
    clothType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Queue","stitching", "ready", "delivered"],
      default: "Queue",
    },
    price: {
      type: Number,
      
      required: true,
    },
    advancePaid: {
      type: Number,
      required: true,
    },
    notes:{
      type:String
    },
    expectedDeliveryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

exports.ordersModel = mongoose.model("Orders", OrdersSchema);
