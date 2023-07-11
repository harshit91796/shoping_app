const mongoose = require("mongoose")
const { schema } = require("./userModel")

const {schema,model}= mongoose;

const productSchema = new schema({
    
    title: {
        type: String,
        requrired: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        requrired: true,
        trim: true
    },
    price: {
        type: Number,
        requrired: true
    },
    currencyId: {
        type: String,
        requrired: true, enum: ["INR"],
        trim: true
    },
    currencyFormat: {
        type: String,
        requrired: true,
        default: "₹",
        trim: true
    },
    isFreeShipping: {
        type: Boolean,
        default: false
    },
    productImage: {
        type: String,
        requrired: true
    },
    style: {
        type: String,
        trim: true
    },
    availableSizes: {
        type: [String],
        enum: ["S", "XS", "M", "X", "L", "XXL", "XL"],
        trim: true,
        toUpperCase: true
    },
    installment: {
        Type: Number
    },
    deletedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });



const Product = model("product",productSchema)

module.exports = Product