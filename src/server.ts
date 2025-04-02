import 'reflect-metadata';
import express from 'express';
import './jobs/cronJobs';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/authRoutes';
import employeeRoutes from './routes/employeeRoutes';
import { errorHandler } from './middleware/errorMiddleware';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', employeeRoutes);
app.use(errorHandler);

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        app.listen(5000, () => console.log('Server running on port 5000'));
    })
    .catch((error: any) => console.log(error));
    
