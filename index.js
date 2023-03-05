import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import recipiesRoutes from './routes/recipies.js';
import recipyCategoriesRoutes from './routes/recipyCategories.js';
import productsRoutes from './routes/products.js';
import productCategoriesRoutes from './routes/productCategories.js';

const app = express();
config();

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log("MongoDB connected")
}

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/recipies', recipiesRoutes)
app.use('/api/recipyCategories', recipyCategoriesRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/productCategories', productCategoriesRoutes)

app.listen(3000, () => {
    console.log("Server started on port 3000")
    connectDB()
})