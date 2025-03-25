import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  // host: process.env.DB_HOST,
  driver: require('mysql2'),
  host: 'localhost',
  // port: Number(process.env.DB_PORT),
  port: 3306,
  username: 'root',
  password: 'Root@123',
  database: 'system_db',
  synchronize: false,  // Set to false for production; use migrations
  logging: true,
  entities: ['src/entities/*.ts'],
  migrations: ['./src/migrations/*.ts'],
  subscribers: [],
});