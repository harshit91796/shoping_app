const Orders = require("../models/ordersModel")
const User = require("../models/userModel");
const {isValid,isValidEmail,isValidMobile,isValidPrice,isValidInstallment} = require("../util/validation")

async function createModel(req,res){
     try {
        const userId = req.params.userId;
            if (!isValidObjectId(userId)) {
                return res.status(400).send({ status: false, message: "invalid userId" });
            }
        const user = await User.findbyId(userId)
        if(!user){
            return res.status(400).send({ status: false, message: "invalid userId" });

        }
        const cart = await cart.findbyId({userId : userId})
        if(!user){
            return res.status(400).send({ status: false, message: "invalid cartId" });

        }
        
        const totalQuantity = cart.items.reduce((acc, curr)=>{
                  acc += curr.quantity
                  return acc
        },0)
       


        obj={
            userId : userId,
            items : cart.items,
            totalPrice : totalPrice,
            totalitems : totalitems,
            totalQuantity : totalQuantity,
        }

        await Orders.create(obj)

        res.status(201).send({status : true , data : obj , msg : "succesfully created"})
     } catch (error) {
        if (error.message.includes("validation")) {
            return res.status(400).send({ status: false, message: error.message })
        }
          return res.status(500).send({err : error.message})
        }
 }



 async function updateModel(req,res){
    try {
       const userId = req.params.userId;
           if (!isValidObjectId(userId)) {
               return res.status(400).send({ status: false, message: "invalid userId" });
           }
       const user = await User.findbyId(userId)
       if(!user){
           return res.status(400).send({ status: false, message: "invalid userId" });

       }
       const orderId = await Orders.findbyId(req.body.orderId)
       if(!orderId){
           return res.status(400).send({ status: false, message: "invalid orderId" });

       }

       if(!req.body.status){
        return  res.status(400).send({status : false, msg : "status required" })
      }

       if (!isValid(req.body.status)) {
        return res.status(400).send({ status: false, message: "invalid status" });
    }
      const state = [pending, completed, cancled];   

     if(req.body.status){
        if(req.body.status === "cancled"){
            if(orderId.cancellable === true ){
              var updated = await Orders.findByIdAndUpdate(orderId,{status : "cancled"},{new : true})
               return res.status(200).send({ status: true,data : updated, message: "ordere is canceled" })
            }
            else{
               return res.status(400).send({ status: false, message: "order cant be cancellabe" });   
            }
         }
   
         if(req.body.status === "completed"){
           
             var updated = await Orders.findByIdAndUpdate(orderId,{status : "completed"},{new : true})
              return res.status(200).send({ status: true,data : updated, message: "ordere is completed" })
        }
   
        if(req.body.status === "pending"){
              
           if(orderId.status !== "pending"){
               var updated = await Orders.findByIdAndUpdate(orderId,{status : "pending"},{new : true})
            return res.status(200).send({ status: true,data : updated, message: "ordere is pending" })
           }
           else{
               return res.status(400).send({ status: false,data : updated, message: "already pending" })
           }
           
        }
     }
     else{
        return res.status(400).send({ status: false, message: "your status state is incorrect it should be between this "+"pending, completed, cancled" })
     }

    } catch (error) {
       if (error.message.includes("validation")) {
           return res.status(400).send({ status: false, message: error.message })
       }
         return res.status(500).send({err : error.message})
       }
}


module.exports = {createModel,updateModel}