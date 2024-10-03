import express from 'express';
import farmerRoutes from './routes/farmer.js';
import farmRoutes from './routes/farm.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import cors from 'cors';

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3001', // Allow only this front-end origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

// Middleware to parse JSON bodies
app.use(express.json());

// API routes
app.use("/api/farmer", farmerRoutes);
app.use("/api/farm", farmRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
