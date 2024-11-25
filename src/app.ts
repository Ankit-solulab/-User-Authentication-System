import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import cors from 'cors';


dotenv.config();
const app = express();
app.use(cors());

// Middleware for JSON parsing
app.use(express.json());

// Request logging middleware
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/authorization-flow';
if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined');
}
mongoose
    .connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Global error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;

