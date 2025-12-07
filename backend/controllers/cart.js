const cartModel = require("../models/cartSchema");

const addToCart = (req, res) => {
  const { productid } = req.params;
  const userid = req.token.id;
  const newCart = new cartModel({ userid, productid });
  newCart
    .save()
    .then((result) => {
      console.log("test");
      res.status(201).json({
        success: true,
        message: `cart added Successfully`,
        order: result,
      });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};
const getCartByUsetId = (req, res) => {
  const userid = req.token.id;
  
  cartModel
    .find({ userid })
    .populate( "productid" )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err.message)
    });
};
const deleteCartByUsetId = (req,res)=>{
 const userid = req.token.id;
  
  cartModel
    .find({ userid })
    .populate( "productid" )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err.message)
    });
}
module.exports = { addToCart, getCartByUsetId, deleteCartByUsetId};
