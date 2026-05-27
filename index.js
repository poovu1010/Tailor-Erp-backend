const { ConnectDB } = require("./config/Database");
const express = require("express");

const { ownerRouter } = require("./routes/OwnerRouter");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const { config } = require("dotenv");

const app = express();
config()
app.use(cors({
   origin:["http://localhost:5173", "http://3.220.158.94:5173","https://tailor-erp-frontrnd.vercel.app"],
   credentials:true
}))
app.use(express.json());
app.use(cookieParser());

const startServer = async () => {
  try {
    console.log(process.env.MONGODB_CONNECTION_STRING)
    await ConnectDB();
    app.listen(process.env.PORT, () => {
      console.log(`Server is Strated ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

app.use("/Owner", ownerRouter);
