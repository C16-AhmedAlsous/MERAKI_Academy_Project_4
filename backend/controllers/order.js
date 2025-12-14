const { clearCart } = require("../controllers/cart");
const cartModel = require("../models/cartSchema");
const orderModel = require("../models/ordersSchema");


const order = async (req, res) => {
  try {
    const { userId, items, address, totalamount } = req.body;

    const orderDoc = new orderModel({
      userId,
      items,
      address,
      totalamount,
    });

    const result = await orderDoc.save();

   
    await cartModel.deleteMany({ userid: userId });

    res.status(201).json({
      success: true,
      message: `order added Successfully`,
      order: result,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
const getOrderByUser = (req, res) => {
  const user = req.user._id;
  orderModel
    .find({ user })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

module.exports = { order, getOrderByUser };
