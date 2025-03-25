import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Employee } from '../entities/Employee';
import { AppDataSource } from '../config/data-source';
import { validate } from 'class-validator';

const employeeRepository = AppDataSource.getRepository(Employee);

export class AuthController {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { firstName,lastName, email, password, role } = req.body;

            // Check if email is already registered
            const existingEmployee = await employeeRepository.findOne({ where: { email } });
            if (existingEmployee) {
                res.status(400).json({ message: 'Email already exists' });
                return;
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new employee
            const employee = employeeRepository.create({ firstName,lastName, email, password: hashedPassword, role });
            
            // Validate entity before saving
            const errors = await validate(employee);
            if (errors.length > 0) {
                res.status(400).json({ message: 'Validation failed', errors });
                return;
            }

            await employeeRepository.save(employee);
            res.status(201).json({ message: 'Employee registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error registering employee', error });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            // Check if employee exists
            const employee = await employeeRepository.findOne({ where: { email } });
            if (!employee) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }

            // Verify password
            const isMatch = await bcrypt.compare(password, employee.password);
            if (!isMatch) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: employee.id, email: employee.email, role: employee.role },
                'your_secret_key', // Replace with env variable in production
                { expiresIn: '1h' }
            );

            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    }
}


