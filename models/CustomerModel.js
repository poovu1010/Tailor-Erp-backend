const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shops",
    },
    customer_name: {
      required: true,
      type: String,
      maxLength: 30,
      minLength: 5,
    },
    Phone: {
      type: Number,
      min: 10,
    },
    Addres: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

exports.CustomerModel = mongoose.model("customerDetail", CustomerSchema);
