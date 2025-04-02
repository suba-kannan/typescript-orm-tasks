import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Employee } from '../entities/Employee';
import { AppDataSource } from '../config/data-source';

const employeeRepository = AppDataSource.getRepository(Employee);

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, role } = req.body;
  
      console.log("Registering user:", { name, email, password, role });
  
      const existingEmployee = await employeeRepository.findOne({ where: { email } });
      if (existingEmployee) {
        console.log("Email already exists");
        res.status(400).json({ message: "Email already exists" });
        return;
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const employee = employeeRepository.create({ name, email, password: hashedPassword, role });
  
      await employeeRepository.save(employee);
      console.log("Employee registered successfully!");
      res.status(201).json({ message: "Employee registered successfully" });
    } catch (error) {
      console.error("Error registering employee:", error);
      res.status(500).json({ message: "Error registering employee", error });
    }
  }
  

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const employee = await employeeRepository.findOne({ where: { email } });
      if (!employee || !(await employee.comparePassword(password))) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }

      const token = jwt.sign(
        { id: employee.id, email: employee.email , role:employee.role},
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );

      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  }
}