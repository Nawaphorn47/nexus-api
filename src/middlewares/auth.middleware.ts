// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// ขยาย Type ของ Request ให้รองรับตัวแปร user ที่เราจะแนบเข้าไป
export interface AuthRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // ดึง Token จาก Header ที่ชื่อว่า Authorization
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  // ตัดคำว่า "Bearer " ออก เพื่อเอาแค่ตัว Token จริงๆ
  const token = authHeader.split(' ')[1];

  try {
    // ตรวจสอบความถูกต้องของ Token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // แนบข้อมูลที่ถอดรหัสได้ (เช่น userId) ไปกับ Request เพื่อให้ Controller เอาไปใช้ต่อได้
    req.user = decoded;
    
    // อนุญาตให้ผ่านไปทำงานใน Controller ถัดไป
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};