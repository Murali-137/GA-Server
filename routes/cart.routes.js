import express from "express";
import { updateCart } from "../controllers/cart.controller.js";
import authUser from '../middlewares/AuthUser.js';

const router = express.Router();

router.post('/updatecart',authUser,updateCart);

export default router;