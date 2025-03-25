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
            const { name, email, password, role } = req.body;

            // Check if email is already registered
            const existingEmployee = await employeeRepository.findOne({ where: { email } });
            if (existingEmployee) {
                res.status(400).json({ message: 'Email already exists' });
                return;
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new employee
            const employee = employeeRepository.create({ name, email, password: hashedPassword, role });
            
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


// import { Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { AppDataSource } from '../config/data-source';
// import { Employee } from '../entities/Employee';
// export class AuthController {
//     async register(req: Request, res: Response) {
//         const { firstName, lastName, email, password } = req.body;
//         try {
//             const employeeRepo = AppDataSource.getRepository(Employee);
//             const existingUser = await employeeRepo.findOne({ where: { email } });
//             if (existingUser) {
//                 res.status(400).json({ message: 'Email already exists' });
//             }
//             const newEmployee = employeeRepo.create({ firstName, lastName, email, password });
//             await employeeRepo.save(newEmployee);
//             res.status(201).json({ message: 'User registered successfully' });
//         } catch (error) {
//             res.status(500).json({ message: 'Error registering user' });
//         }
//     }
//     async login(req: Request, res: Response) {
//         const { email, password } = req.body;
//         try {
//             const employeeRepo = AppDataSource.getRepository(Employee);
//             const user = await employeeRepo.findOne({ where: { email } });
//             if (!user || !(await bcrypt.compare(password, user.password))) {
//                 res.status(401).json({ message: 'Invalid email or password' });
//             }
//             let token;
//             if(user){
//              token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
//                 expiresIn: '1h',
//             });}
//             res.json({ message: 'Login successful', token });
//         } catch (error) {
//             res.status(500).json({ message: 'Error logging in' });
//         }
//     }
// }