import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/connectDB.js';
import userRoutes from './routes/user.routes.js';
import sellerRoutes from './routes/seller.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import addressRoutes from './routes/address.routes.js';
import { connectCloudinary } from './config/cloudinary.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://quiba.onrender.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/images", express.static("uploads"));

app.use('/api/user', userRoutes);
app.use('/api/admin', sellerRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/address', addressRoutes);

app.use(express.static(path.join(__dirname, 'client/dist')));

// ✅ Fixed: Use a compatible wildcard route
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;

connectDB();
connectCloudinary();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
