import express from "express";
import authUser from "../middlewares/AuthUser.js";
import { addAddress, getAddress } from "../controllers/address.controller.js";


const router = express.Router();

router.post('/add-address',authUser,addAddress);
router.get('/get-Add',authUser,getAddress);

export default router;