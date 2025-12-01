const express = require("express");
const productRouter = express.Router();
const {
  createNewProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById
} = require("../controllers/product");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

productRouter.post("/newproduct",authentication,authorization("addProduct"), createNewProduct);
productRouter.get("/getallproduct", getAllProduct);
productRouter.get("/getProductById/:id", getProductById);
productRouter.put("/:id", authentication,authorization("updateProduct"),updateProductById);
productRouter.delete("/:id",authentication,authorization("deleteProduct"),deleteProductById)

module.exports = productRouter;
