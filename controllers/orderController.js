const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    const totalPrice = cart.items.reduce((sum, item) => {
      return sum + item.quantity * 100; // you can fetch product price if needed
    }, 0);

    const order = new Order({
      userId,
      items: cart.items,
      totalPrice
    });

    await order.save();
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({ msg: "Order placed", order });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate("items.productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
