// src/routes/protected.routes.ts
import { Response, Router } from 'express';
import { verifyToken, AuthRequest } from '../middlewares/auth.middleware';

const router = Router();

// Endpoint: GET /api/protected/profile
// สังเกตว่าเราเอา verifyToken มาคั่นไว้ตรงกลาง
router.get('/profile', verifyToken, (req: AuthRequest, res: Response) => {
  res.status(200).json({
    message: 'Welcome to the protected route!',
    // เราสามารถเข้าถึง req.user ได้เพราะยาม (Middleware) ตรวจแล้วและแนบมาให้
    user: req.user 
  });
});

export default router;