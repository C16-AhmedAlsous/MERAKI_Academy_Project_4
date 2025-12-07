const express = require("express");
const orderRouter = express.Router()

const {order,getOrderByUser} = require("../controllers/order");
const authentication = require("../middleware/authentication");


orderRouter.post("/order",authentication,order)
orderRouter.get("/getOrderByUser/:id",authentication,getOrderByUser)



module.exports = orderRouter