import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/connectDB.js';
import userRoutes from './routes/user.routes.js';
import sellerRoutes from './routes/seller.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import addressRoutes from './routes/address.routes.js';
import { connectCloudinary } from './config/cloudinary.js';

dotenv.config();

const app = express();
const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    credentials:true
}))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send('Hello World!');
})





app.use("/images", express.static("uploads"));
app.use('/api/user',userRoutes);
app.use('/api/admin',sellerRoutes);
app.use('/api/product',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/order',orderRoutes);
app.use('/api/address',addressRoutes);

const PORT = process.env.PORT || 5000;

connectDB();
connectCloudinary();

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
});