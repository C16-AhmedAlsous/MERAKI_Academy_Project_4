const express = require("express");
const cartRouter = express.Router();
const {
  addToCart,
  getCartByUsetId,
  deleteCartById,
} = require("../controllers/cart");
const authentication = require("../middleware/authentication");

cartRouter.post("/addcart/:productid", authentication, addToCart);
cartRouter.get("/getCartByUsetId", authentication, getCartByUsetId);
cartRouter.delete("/deleteCart/:id", authentication, deleteCartById);

module.exports = cartRouter;