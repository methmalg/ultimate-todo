import { Router } from 'express';
import { register } from '../controllers/authController';

const router = Router();

// POST http://localhost:5000/api/auth/register
router.post('/register', register);

export default router;