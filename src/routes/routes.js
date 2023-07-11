const aws= require("aws-sdk")
const express = require('express');
const router = express.Router();

const {createUser,userUpdate,login,getUser} = require('../controller/userController');
const {auth,hashpass,authorization} = require('../middleware/auth');
const {createProduct, getProduct, getProductById, updateProduct, deleteProduct} = require('../controller/productController');
const {createCart, getCart, updateCart, deleteCart} = require('../controller/cartController');
const{createModel,updateModel} = require('../controller/ordersController')
//==================================== User ============================================//
router.post('/register', createUser);
router.post('/login', login);
router.get('/user/:userId/profile', auth, authorization, getUser);
router.put('/user/:userId/profile', auth, authorization, userUpdate);

//==================================== product ============================================//
router.post('/products', createProduct);
router.get('/products',getProduct);
router.get('/products/:productId', getProductById);
router.put('/products/:productId', updateProduct);
router.delete('/products/:productId', deleteProduct);

//==================================== cart ============================================//
router.post('/users/:userId/cart', auth, authorization, createCart);
router.put('/users/:userId/cart', auth, authorization, updateCart);
router.get('/users/:userId/cart', auth, authorization, getCart);
router.delete('/users/:userId/cart', auth, authorization, deleteCart);

//==================================== cart ============================================//

router.post('/users/:userId/orders', auth, authorization, createModel);
router.put('/users/:userId/orders', auth, authorization, updateModel);

module.exports = router;




aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
})



router.post('/hello',(req,res) =>{
    console.log("helloooo")
    res.send({msg : "gjygjjg"})
})

router.post('/register',hashpass,createUser)

module.exports = router