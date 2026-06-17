const { mongoose } = require("mongoose");
const { CustomerModel } = require("../models/CustomerModel");



exports.createCustomer = async (req, res, next) => {
   try {

      const {
         customer_name,
         Phone,
         Email,
         Addres
      } = req.body;


      // unique cr duplicte customer

      const isCustomerExists = await CustomerModel.findOne({
         shopId: req.user,
         Phone
      })

      if (isCustomerExists) {
         return res.status(400).json({
            status: false,
            message: "Customer already exists or change Number"
         })
      }

      const customer = new CustomerModel({
         customer_name,
         Phone,
         Addres,
         shopId: req.user
      });

      const data = await customer.save();

      res.status(201).json({
         success: true,
         message: "Customer Created",
         data
      });
   } catch (err) {

      next(err)
   }

};

// GET ALL CUSTOMERS
exports.getAllCustomers = async (req, res, next) => {

   try {

      const shopId = req.user


      const getCustomersWithOrders = await CustomerModel.aggregate([{
         $match: {
            shopId: new mongoose.Types.ObjectId(shopId)
         }
      },
      {
         $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "customerId",
            as: "orders"
         }
      },
      {
         $addFields: {
            totalOrder: { $size: "$orders" }
         }
      },
      {
         $project: {
            orders: 0
         }
      }
      ])


      console.log(getCustomersWithOrders)
      res.status(200).json({

         success: true,
         data: getCustomersWithOrders



      });

   } catch (err) {

      next(err)

   }

};

// GET SINGLE CUSTOMER
exports.getSingleCustomer = async (req, res, next) => {

   try {
      const userId = req.user
      // console.log(userId)

      const { id } = req.params
      const getAllDetail = await CustomerModel.aggregate([{
         $match: {
            _id: new mongoose.Types.ObjectId(id),
            shopId: new mongoose.Types.ObjectId(req.user)
         }

      },
      {
         $lookup: {
            from: "orders",
            localField: "_id",
            foreignField:"customerId",
            as:"OrdersData"
         }
      },{
         $addFields:{
            totalOrder:{$size:"$OrdersData"},
            totalAmount:{$sum:"$OrdersData.price"}
         },
      }
      
      ])
      res.status(200).json({
         status:"success",
         message:"successfully fetched",
         data:getAllDetail
      })

   } catch (err) {
      next(err)
   }

};



//  UPDATE CUSTOMER
exports.updateCustomer = async (req, res, next) => {

   try {

      const updatedCustomer =
         await CustomerModel.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
               new: true
            }

         );

      res.status(200).json({

         success: true,

         message: "Customer Updated",

         data: updatedCustomer

      });

   } catch (err) {

      console.log(err);
      next(err)

   }

};



exports.deleteCustomer = async (req, res, next) => {
   try {

      await CustomerModel.findByIdAndDelete(
         req.params.id
      );

      res.status(200).json({

         success: true,

         message: "Customer Deleted"

      });

   } catch (err) {

      console.log(err);

      next(err)



   }

};