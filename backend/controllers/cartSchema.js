const { default: mongoose } = require("mongoose");
const mpngoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userid:{ type: mongoose.Schema.Types.ObjectId, ref: "User"},
  productid:{ type: mongoose.Schema.Types.ObjectId, ref: "Product"}
});



module.exports = mongoose.model("Cart", cartSchema);