import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();
const authController = new AuthController();

router.post('/register', async (req, res) => authController.register(req, res));
router.post('/login', async (req, res) => authController.login(req, res));

export default router;

// import { Router } from 'express';
// import { AuthController } from '../controllers/authController';
// const router = Router();
// const authController = new AuthController();
// router.post('/register', authController.register);
// router.post('/login', authController.login);
// export default router;