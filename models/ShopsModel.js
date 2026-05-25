const mongoose = require("mongoose");

const shopDetailSchema = mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
      minlength: 4,
    },
    OwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUsers",
      required: true,
    },
    phoneNumber: {
      type: Number,
      min: 10,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

exports.ShopModel = mongoose.model("shops", shopDetailSchema);
