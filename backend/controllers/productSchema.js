const { default: mongoose } = require("mongoose");
const mpngoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
    description:{type:String},
    price:{type:String,required:true},
    imageurl:{true:URL},
    catagory:{type:String},
    rating:{type:Number}
});



module.exports = mongoose.model("Product", productSchema);