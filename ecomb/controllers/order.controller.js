import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Stripe from "stripe";

//global variables
const currency = "inr"; //currency for stripe and razorpay
const deliveryCharge = 10; //delivery charge for orders

//gateway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// })


//placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            // status: "Order Placed",  // default status is "Order Placed" in the model
            paymentMethod: "COD",
            payment: false,
        }

        const newOrder = new Order(orderData);
        await newOrder.save();

        await User.findByIdAndUpdate(userId, {cartData: {}});

        res.status(200).json({ success: true, message: "Order placed successfully(Backend)" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//placing orders using stripe Method


//verify stripe payment


//placing orders using razorpay Method




//All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//All orders data for user panel
const userOrders = async (req, res) => {
    try {
        
        const {userId} = req.body;
        const orders = await Order.find({userId})
        res.status(200).json({ success: true, orders });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//update order status from admin panel
const updateStatus = async (req, res) => {

    try {
        
        const { orderId, status } = req.body;
        await Order.findByIdAndUpdate(orderId, { status });

        res.status(200).json({ success: true, message: "Order status updated successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }

}

export {
    placeOrder,
   
    allOrders,
    userOrders,
    updateStatus,
  
};