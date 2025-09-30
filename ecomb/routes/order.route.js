import express from "express";
import {
	placeOrder,
	
	allOrders,
	userOrders,
	updateStatus,
   
} from "../controllers/order.controller.js";
import adminAuth from "../middlewares/adminAuth.js";
import authUser from "../middlewares/auth.js";

const orderRouter = express.Router();

// admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// payment features
orderRouter.post("/place", authUser, placeOrder);


// user features
orderRouter.post("/userorders", authUser, userOrders);




export default orderRouter;
