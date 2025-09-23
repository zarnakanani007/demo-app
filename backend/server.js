import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';

dotenv.config();
connectDB();

const app = express();

//Enable cors for all origins (for development)
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products',productRoutes)

const PORT =5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
