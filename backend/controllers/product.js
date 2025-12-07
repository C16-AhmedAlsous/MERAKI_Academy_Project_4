const ProductModel = require("../models/productSchema");

const createNewProduct = (req, res) => {
  const { name, description, price, imageurl, catagory, rating } = req.body;

  const product = new ProductModel({
    name,
    description,
    price,
    imageurl,
    catagory,
    rating,
  });
  product
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `product added Successfully`,
        product: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `only admin can add product`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
const getAllProduct = (req, res) => {
  const products = ProductModel.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};
const getProductById = (req, res) => {
  let id = req.params.id;
  const product = ProductModel.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The article with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The product ${id} `,
        article: result,
      });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};
const updateProductById = (req, res) => {
  const id = req.params.id;
  ProductModel.findByIdAndUpdate({ _id: id }, req.body)
    .then((Product) => {
      if (!Product) {
        return res.status(404).json({
          success: false,
          message: `The product with id => ${id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `product updated`,
        article: Product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
const deleteProductById = (req, res) => {
  const id = req.params.id;
  ProductModel.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The product with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `product deleted`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
module.exports = {
  createNewProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
