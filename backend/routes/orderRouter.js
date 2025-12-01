const express = require("express");
const orderRouter = express.Router()

const {order,getOrderByUser} = require("../controllers/order")


orderRouter.post("/order",order)
orderRouter.get("/getOrderByUser/:id",getOrderByUser)



module.exports = orderRouter