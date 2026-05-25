const { config } = require("dotenv");
const mongoose = require("mongoose");
config();
exports.ConnectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("DbConnected");
  } catch (error) {
    console.log(error);
  }
};
