const User = require("../models/userModel");
const bcrypt = require('bcrypt')
const {uploadFile}= require('../aws/aws')
const { isValidObjectId } = require('mongoose');

const jwt = require('jsonwebtoken');
const {isValid,isValidEmail,isValidMobile} = require("../util/validation")

 

async function createUser(req,res){
    try {
        const {fname,lname,email,phone,password,address } = req.body

        const {shipping , billing} = address
        console.log(password)
        
        // const {fname,lname,email,phone,password,address,shipping,billing} = req.body;
        
         const files = req.files
     console.log(files)


        if(files && files.length>0){
            let uploadedFileURL= await uploadFile( files[0] )
            // res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
            req.body.profileImage = uploadedFileURL
        }
        else{
            res.status(400).send({ msg: "No file found2" })
        }

        if(req.body === null){
            return res.status(400).send({status : false, msg : "enter the data of user"})
           }
           if (!isValid(fname)) {
            return res.status(400).send({ status: false, message: "invalid fname" });
        }
        if (!isValid(lname)) {
            return res.status(400).send({ status: false, message: "invalid lname" });
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "invalid email" });
        }
        if (!isValidMobile(phone)) {
            return res.status(400).send({ status: false, message: "invalid phone" });
        }
        
        if(address === null){
      
            return  res.status(400).send({status : false, msg : "address required" })
           }
        if(billing === null){
      
            return  res.status(400).send({status : false, msg : "billing required" })
           }
           if(billing === null){
      
            return  res.status(400).send({status : false, msg : "shipping required" })
           }
           
           

          if(!shipping.street){
            return  res.status(400).send({status : false, msg : "street required" })
          }
          if (!isValid(shipping.street)) {
            return res.status(400).send({ status: false, message: "invalid street" });
        }
          if(!shipping.city){
            return  res.status(400).send({status : false, msg : "city required" })
          }
          if (!isValid(shipping.city)) {
            return res.status(400).send({ status: false, message: "invalid city" });
        }
          if(!shipping.pincode){
            return  res.status(400).send({status : false, msg : "pincode required" })
          }
          if (!isValid(shipping.pincode)) {
            return res.status(400).send({ status: false, message: "invalid pincode" });
        }

          if(!billing.street){
            return  res.status(400).send({status : false, msg : "street required" })
          }
          if (!isValid(billing.street)) {
            return res.status(400).send({ status: false, message: "invalid street" });
        }
          if(!billing.city){
            return  res.status(400).send({status : false, msg : "city required" })
          }
          if (!isValid(billing.city)) {
            return res.status(400).send({ status: false, message: "invalid city" });
        }
          if(!billing.pincode){
            return  res.status(400).send({status : false, msg : "pincode required" })
          }
          if (!isValid(billing.pincode)) {
            return res.status(400).send({ status: false, message: "invalid pincode" });
        }
      
        if(!email){
            return res.status(400).send({status : false, msg : "email required"})
           }
        
       const emailDublicate = await User.findOne({ email: email})
         if(emailDublicate){
         return res.status(400).send({status : false, msg : "email is already registered"})
        }
        if(!phone){
            return res.status(400).send({status : false, msg : "phone required"})
           }
        
       const phoneDublicate = await User.findOne({ phone: phone})
         if(phoneDublicate){
         return res.status(400).send({status : false, msg : "phone is already registered"})
        }
        
        await User.create(req.body)
         
        res.status(201).send({status : true , data : req.body , msg : "succesfully created"})
         
           
       

        
    } catch (error) {
        if (error.message.includes("validation")) {
            return res.status(400).send({ status: false, message: error.message })
        }
          return res.status(500).send({err : error.message})
        }
    }

    async function login(req,res){
        try {
            const {email, password} = req.body
    
        if(!email){
            return res.status(400).send({status : false, msg : "email required"})
           }
        if(!password){
            return res.status(400).send({status : false, msg : "password required"})
        }
        
     
          const data = await User.findOne({ email: email})
         
         if(!data){
             return res.status(400).send({status : false, msg : "no data with that user"})
            }
         
         const hashed = await bcrypt.compare(password,data.password)
    
         if(hashed){
               const token = jwt.sign({userId : data._id},process.env.JWT_KEY)
               res.setHeader('X-api-key',token)
               res.status(200).send({status : true, data : token})
    
         }
        } catch (error) {
            if (error.message.includes("validation")) {
                return res.status(400).send({ status: false, message: error.message })
            }
              return res.status(500).send({err : error.message})
        }
    
       }

    async function getUser(req,res){
        try {
            const userId = req.params.userId;
            if (!isValidObjectId(userId)) {
                return res.status(400).send({ status: false, message: "invalid userId" });
            }
            const user = await User.findById(userId);
            if(!user) return res.status(404).json({status:false,message:"no user found"});
            return res.status(200).send({ status: true,data : user, message: "User profile details" })

        } catch (error) {
            return res.status(500).send({err : error.message})
        }
    }


       async function userUpdate(req,res){
        try {
            const userId = req.params.userId;
            const {fname,lname,email,phone,password,address } = req.body
            if (!isValidObjectId(userId)) {
                return res.status(400).send({ status: false, message: "invalid userId" });
            }
            const user = await User.findById(userId);
            if(!user) return res.status(404).json({status:false,message:"no user found"});
            const data = req.body;
            if(req.body === null){
                return res.status(400).send({status : false, msg : "enter the data of user"})
               }
            //  function present(value) {
            //     if(fname || lname || email||phone||password||address){

            //     }

            // }
               if(fname){
               if (!isValid(fname)) {
                return res.status(400).send({ status: false, message: "invalid fname" });
            }}
            if(lname){
            if (!isValid(lname)) {
                return res.status(400).send({ status: false, message: "invalid lname" });
            }
        }
        if(email){
            if (!isValidEmail(email)) {
                return res.status(400).send({ status: false, message: "invalid email" });
            }
        }
         if(phone){
            if (!isValidMobile(phone)) {
                return res.status(400).send({ status: false, message: "invalid phone" });
            }
        }
        if(req.files){
            const files = req.files;
            if(files && files.length>0){
                let uploadedFileURL= await uploadFile( files[0] )
                req.body.profileImage = uploadedFileURL
            }
        }
        if(address){
               if(shipping){
                  if(shipping.street){
                    if (!isValid(shipping.street)) {
                        return res.status(400).send({ status: false, message: "invalid street" });
                       }
                  }
                  
                  if(shipping.city){
                    if (!isValid(shipping.city)) {
                        return res.status(400).send({ status: false, message: "invalid city" });
                        }
                  }
                 
                  if(shipping.pincode){
                    if (!isValid(shipping.pincode)) {
                        return res.status(400).send({ status: false, message: "invalid pincode" });
                       }
                   }
                 
               }

               if(billing){
                if(billing.street){
                  if (!isValid(shipping.street)) {
                      return res.status(400).send({ status: false, message: "invalid street" });
                     }
                }
                
                if(billing.city){
                  if (!isValid(shipping.city)) {
                      return res.status(400).send({ status: false, message: "invalid city" });
                      }
                }
               
                if(billing.pincode){
                  if (!isValid(shipping.pincode)) {
                      return res.status(400).send({ status: false, message: "invalid pincode" });
                     }
                 }
               
             }
        }
            const updation = await User.findByIdAndUpdate(
                userId,
                req.body,
                {new:true}
            );
            return res.status(200).send({ status: true,data : updation, message: "User profile updated" })
        } catch (error) {
            if (error.message.includes("validation")) {
                return res.status(400).send({ status: false, message: error.message })
            }
              return res.status(500).send({err : error.message})
        }
    
    }

      
    


module.exports = {createUser,userUpdate,login,getUser}