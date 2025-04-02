import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Employee } from '../entities/Employee';

export class EmployeeController {

  //GET ID
  async getEmployeeById(req: Request, res: Response, next: NextFunction) {
    const id = (req as any).user.id;
    try {
      const employee = await AppDataSource.getRepository(Employee).findOneBy({ id });
      if (!employee) {res.status(404).json({ message: 'Employee not found' });
    return}
      res.json(employee);
    } catch (error) {
      next(error);
    }
  }

  //GET ALL
  async getAllEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      const employees = await AppDataSource.getRepository(Employee).find();
      res.json(employees);
    } catch (error) {
      next(error);    }
  }

  // POST
  async createEmployee(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, role } = req.body;
    try {
        
        const newEmployee = AppDataSource.getRepository(Employee).create(req.body);   
        const result = await AppDataSource.getRepository(Employee).save(newEmployee);
        console.log(req.body, result);
        res.status(201).json(newEmployee);
    } catch (error) {
      next(error);
    }
}

// PUT
async updateEmployee(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;
    try {
        const employee = await AppDataSource.getRepository(Employee).findOneBy({ id });
        if (employee) {

            employee.name = name || employee.name;
            employee.email = email || employee.email;
            employee.password = password || employee.password;

            await AppDataSource.getRepository(Employee).save(employee);
            res.json(employee);
        }
    } catch (error) {
      next(error);    }
}

// DELETE
async deleteEmployee(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id, 10);
    try {
        const employee = await AppDataSource.getRepository(Employee).findOneBy({ id });
        if (!employee) { res.status(404).json({ message: 'Employee not found' }); }

        else {
            await AppDataSource.getRepository(Employee).remove(employee);
            res.status(200).json({ message: 'Employee deleted successfully' });
        }
    } catch (error) {
      next(error);    }
}
}
