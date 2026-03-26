// src/routes/index.ts
import { Router } from 'express';
import authRoutes from './auth.routes';
import protectedRoutes from './protected.routes';

const router = Router();

// จัดกลุ่ม Routes ให้เป็นระเบียบ
router.use('/auth', authRoutes);
router.use('/protected', protectedRoutes);

export default router;