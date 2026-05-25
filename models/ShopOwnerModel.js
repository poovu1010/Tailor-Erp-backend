const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "please enter the username"],
    minlength: [4, "minimum 4 Characters"],
    maxlength: [30, "maximum 30 Charaters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid Email",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: {
      values: ["Owner", "Staff", "Tailor"],
      message: "{value} is not a valid role",
    },
    default: "Owner",
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shops",
    // required:true
  },
});

exports.AdminModel = mongoose.model("AdminUsers", AdminSchema);
