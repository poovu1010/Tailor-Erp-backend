

// CREATE CUSTOMER
exports.createCustomer = async(req,res)=>{

   try{

      const {
         customer_name,
         Phone,
         Addres
      } = req.body;

      const customer = await CustomerModel.create({

         customer_name,

         Phone,

         Addres,

         shopId:req.user.shopId

      });

      res.status(201).json({

         success:true,

         message:"Customer Created",

         data:customer

      });

   }catch(err){

      console.log(err);

      res.status(500).json({

         success:false,

         message:"Server Error"

      });

   }

};

// GET ALL CUSTOMERS
exports.getAllCustomers = async(req,res)=>{

   try{

      const customers = await CustomerModel.find({

         shopId:req.user.shopId

      });

      res.status(200).json({

         success:true,

         data:customers

      });

   }catch(err){

      console.log(err);

      res.status(500).json({

         success:false,

         message:"Server Error"

      });

   }

};

// GET SINGLE CUSTOMER
exports.getSingleCustomer = async(req,res)=>{

   try{

      const customer = await CustomerModel.findById(
         req.params.id
      );

      if(!customer){

         return res.status(404).json({

            success:false,

            message:"Customer Not Found"

         });

      }

      res.status(200).json({

         success:true,

         data:customer

      });

   }catch(err){

      console.log(err);

      res.status(500).json({

         success:false,

         message:"Server Error"

      });

   }

};



//  UPDATE CUSTOMER
exports.updateCustomer = async(req,res)=>{

   try{

      const updatedCustomer =
      await CustomerModel.findByIdAndUpdate(

         req.params.id,

         req.body,

         {
            new:true
         }

      );

      res.status(200).json({

         success:true,

         message:"Customer Updated",

         data:updatedCustomer

      });

   }catch(err){

      console.log(err);

      res.status(500).json({

         success:false,

         message:"Server Error"

      });

   }

};



exports.deleteCustomer = async(req,res)=>{
   try{

      await CustomerModel.findByIdAndDelete(
         req.params.id
      );

      res.status(200).json({

         success:true,

         message:"Customer Deleted"

      });

   }catch(err){

      console.log(err);

      res.status(500).json({

         success:false,

         message:"Server Error"

      });

   }

};