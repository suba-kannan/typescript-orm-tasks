import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Employee } from '../entities/Employee';

export class EmployeeController {
    // Get all employees
    async getAllEmployees(req: Request, res: Response) {
        try {
            const employees = await AppDataSource.getRepository(Employee).find();
            res.json(employees);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching employees' });
        }
    }

    // Get employee by ID
    async getEmployeeById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const employee = await AppDataSource.getRepository(Employee).findOneBy({ id });
            if (!employee) res.status(404).json({ message: 'Employee not found' });
            res.json(employee);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching employee' });
        }
    }

    // Create a new employee
    async createEmployee(req: Request, res: Response) {
        const { firstName, lastName, email } = req.body;
        try {
            
            const newEmployee = AppDataSource.getRepository(Employee).create(req.body);   
            const result = await AppDataSource.getRepository(Employee).save(newEmployee);
            console.log(req.body, result);
            res.status(201).json(newEmployee);
        } catch (error) {
            res.status(500).json({ message: 'Error creating employee' });
        }
    }

    // Update an existing employee
    async updateEmployee(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const { firstName, lastName, email } = req.body;
        try {
            const employee = await AppDataSource.getRepository(Employee).findOneBy({ id });
            if (employee) {

                employee.firstName = firstName || employee.firstName;
                employee.lastName = lastName || employee.lastName;
                employee.email = email || employee.email;

                await AppDataSource.getRepository(Employee).save(employee);
                res.json(employee);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating employee' });
        }
    }

    // Delete an employee
    async deleteEmployee(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);
        try {
            const employee = await AppDataSource.getRepository(Employee).findOneBy({ id });
            if (!employee) { res.status(404).json({ message: 'Employee not found' }); }

            else {
                await AppDataSource.getRepository(Employee).remove(employee);
                res.status(200).json({ message: 'Employee deleted successfully' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting employee' });
        }
    }
}
