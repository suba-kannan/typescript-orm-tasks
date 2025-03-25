// src/seeders/employeeSeeder.ts
import { AppDataSource } from '../config/data-source';
import { Employee } from '../entities/Employee';

export const employeeSeeder = async () => {
  try {
    // Create sample employee data
    const employeeRepository = AppDataSource.getRepository(Employee);

    const employees = [
      { id:1,firstName: 'Camilo', lastName: 'Paul', email: 'camilo@example.com', password:"123" },
      { id:2,firstName: 'Kelvin', lastName: 'Hunter', email: 'kelvin@example.com',password:"143" },
      { id:3,firstName: 'Lara', lastName: 'Young', email: 'lara@example.com',password:"345" },
    ];

    // Save employees to the database
    for (const employeeData of employees) {
      const employee = employeeRepository.create(employeeData);
      await employeeRepository.save(employee);
    }

    console.log('Seeded employee data successfully!');
  } catch (error) {
    console.error('Error seeding employee data:', error);
  }
};
