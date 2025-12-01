const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "User", required:true},
    items: [{
        productId:{type: mongoose.Schema.Types.ObjectId, ref: "Product"},
        quantity:{type:Number},
        price:{type:Number}
    }],
    address:{type:String, required:true},
    totalamount:{type:String}
})



module.exports = mongoose.model("Order",orderSchema)