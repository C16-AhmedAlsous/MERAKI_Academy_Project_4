const orderModel = require("../models/ordersSchema");

const order = (req, res) => {
  const { userId, items, address, totalamount } = req.body;
  const order = new orderModel({
    userId,
    items,
    address,
    totalamount,
  });
  order
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `order added Successfully`,
        order: result,
      });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
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
