const mongoose  = require("mongoose");

const cartSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productid: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
});

cartSchema.index({ userid: 1, productid: 1 }, { unique: true });

module.exports = mongoose.model("Cart", cartSchema);