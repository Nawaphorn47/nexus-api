// src/routes/auth.routes.ts
import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

// Endpoint: POST /api/auth/register
router.post('/register', authController.register);

// Endpoint: POST /api/auth/login
router.post('/login', authController.login);

export default router;