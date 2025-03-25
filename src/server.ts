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
    
// import express from 'express';
// import { AppDataSource } from './config/data-source';
// import employeeRoutes from './routes/employeeRoutes';
// import authRoutes from './routes/authRoutes';
// import dotenv from 'dotenv';
// dotenv.config();
// const app = express();
// const PORT = 3001;
// app.use(express.json());
// app.use('/api/auth', authRoutes);
// app.use('/api', employeeRoutes);
// async function dbInitialize() {
//     AppDataSource.initialize()
//         .then(() => {
//             console.log('Database connected successfully');
//         })
//         .catch((error) => {
//             console.error('Database connection failed:', error);
//         });
// }
// app.listen(PORT, async () => {
//     await dbInitialize();
//     console.log(`Server running on port ${PORT}`);
// });