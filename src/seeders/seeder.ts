import { employeeSeeder } from './employeeSeeder';
import { AppDataSource } from '../config/data-source';

const runSeeders = async () => {
  try {
    await AppDataSource.initialize(); 
    await employeeSeeder();
    console.log('Seeding completed.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    process.exit();
  }
};

runSeeders();
