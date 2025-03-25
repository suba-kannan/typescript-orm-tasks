// src/seeders/seeder.ts
import { employeeSeeder } from './employeeSeeder';
import { AppDataSource } from '../config/data-source';

const runSeeders = async () => {
  try {
    await AppDataSource.initialize(); // Ensure the database is connected
    await employeeSeeder(); // Run the employee seeder (you can add more seeders here)
    console.log('Seeding completed.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    process.exit();
  }
};

runSeeders();
