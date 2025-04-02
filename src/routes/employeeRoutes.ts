
import { Router } from 'express';
import { EmployeeController } from '../controllers/employeeController';
import { authenticateAdminToken, authenticateUserToken } from '../middleware/authMiddleware';
import cors from 'cors';

const router = Router();
const employeeController = new EmployeeController();

router.use(cors({ origin: "http://localhost:3000", credentials: true }));

router.get('/employees/:id', authenticateUserToken, employeeController.getEmployeeById);
router.get('/employees', authenticateAdminToken, employeeController.getAllEmployees);
router.post('/addemployees', authenticateAdminToken, employeeController.createEmployee);
router.put('/updateemployees/:id', authenticateAdminToken, employeeController.updateEmployee);
router.delete('/deleteemployees/:id', authenticateAdminToken, employeeController.deleteEmployee);


export default router;
