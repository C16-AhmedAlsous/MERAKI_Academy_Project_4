const express = require("express")
const cartRouter = express.Router()
const {addToCart, getCartByUsetId, deleteCartByUsetId} = require("../controllers/cart")
const authentication = require("../middleware/authentication")

cartRouter.post("/addcart/:productid",authentication,addToCart)
cartRouter.get("/getCartByUsetId",authentication,getCartByUsetId)
cartRouter.delete("/deleteCartByUsetId",authentication,deleteCartByUsetId)

module.exports=cartRouter