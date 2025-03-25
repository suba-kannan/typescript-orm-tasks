import { Router } from 'express';
import { EmployeeController } from '../controllers/employeeController';
import { authenticateToken  } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/authorizeMiddleware';

const router = Router();
const employeeController = new EmployeeController();

router.get('/employees', authenticateToken,  authorizeRoles(['admin', 'manager']), employeeController.getAllEmployees);
router.get('/employees/:id', authenticateToken, authorizeRoles(['admin', 'manager', 'employee']), employeeController.getEmployeeById);
router.post('/employees', authenticateToken, authorizeRoles(['admin']), employeeController.createEmployee);
router.put('/employees/:id', authenticateToken, authorizeRoles(['admin', 'manager']), employeeController.updateEmployee);
router.delete('/employees/:id', authenticateToken, authorizeRoles(['admin']), employeeController.deleteEmployee);

export default router;
