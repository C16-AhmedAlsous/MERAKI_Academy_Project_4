const cartModel = require("../models/cartSchema");

const addToCart = async (req, res) => {
  try {
    const { productid } = req.params;
    const userid = req.token.id;

    const existing = await cartModel.findOne({ userid, productid }).populate("productid");
    if (existing) {
      existing.quantity += 1;
      await existing.save();
      return res.status(200).json({
        success: true,
        message: "Product quantity increased",
        cartItem: existing,
      });
    }

    const newCart = new cartModel({ userid, productid });
    const saved = await newCart.save();
    const populated = await saved.populate("productid");
    return res.status(201).json({
      success: true,
      message: "Cart item added",
      cartItem: populated,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getCartByUsetId = (req, res) => {
  const userid = req.token.id;

  cartModel
    .find({ userid })
    .populate("productid")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

const deleteCartById = (req, res) => {
  const userid = req.token.id;
  const { id } = req.params;

  cartModel
    .findOneAndDelete({ _id: id, userid })
    .then(() => {
      return cartModel.find({ userid }).populate("productid");
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

const clearCart = (req, res) => {
  const userid = req.token.id;
  cartModel.deleteMany({ userid }).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(500).json(err.message);
  });
};

module.exports = { addToCart, getCartByUsetId, deleteCartById, clearCart };
