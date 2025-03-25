import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/authRoutes';

const app = express();
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Start Server
AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        app.listen(5000, () => console.log('Server running on port 5000'));
    })
    .catch((error: any) => console.log(error));
