import express from "express";
import { authSeller } from "../middlewares/AuthSeller.js";
import { getAllOrders, getUserOrders, placeOrderCOD } from "../controllers/order.controller.js";
import authUser from "../middlewares/AuthUser.js";

const router = express.Router();

router.post('/cod',authUser,placeOrderCOD);
router.get('/user',authUser,getUserOrders);
router.get('/seller',authSeller,getAllOrders);

export default router;