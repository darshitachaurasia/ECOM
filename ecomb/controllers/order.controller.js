import Order from "../models/order.model.js";

// Place an order
const placeOrder = async (req, res) => {
  try {
    const { cartItems, address, totalAmount, paymentMethod } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "No cart items provided." });
    }

    const order = new Order({
      userId: req.user.id,   // ✅ matches schema
      items: cartItems,      // ✅ items instead of cartItems
      amount: totalAmount,   // ✅ amount instead of totalAmount
      address,
      paymentMethod,
      status: "Order Placed", // ✅ default in schema, but can be overridden
      payment: paymentMethod !== "cod", // mark paid if not COD
    });

    await order.save();

    res.status(201).json({ success: true, message: "Order placed successfully", order });
  } catch (err) {
    console.error("Order placement error:", err);
    res.status(500).json({ success: false, message: "Error saving order" });
  }
};

// All orders for admin
const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// User’s own orders
const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status (admin)
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
};
