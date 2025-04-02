import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  driver: require('mysql2'),
  host: 'localhost',
  port: 3333,
  username: 'root',
  password: 'Root@123',
  database: 'system_db',
  logging: true,
  entities: ['src/entities/*.ts'],
  migrations: ['./src/migrations/*.ts'],
  subscribers: [],
});