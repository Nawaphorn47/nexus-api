// src/app.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes'; // จะทำการดึงไฟล์ src/routes/index.ts มาอัตโนมัติ

// โหลดตัวแปรจากไฟล์ .env (ถ้ามี)
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// Global Middlewares
// ==========================================
app.use(cors()); // อนุญาตให้ Frontend (เช่น React/Vue) เรียก API ได้
app.use(express.json()); // แปลงข้อมูลที่ส่งมาแบบ JSON ให้กลายเป็น Object (req.body)

// ==========================================
// API Routes
// ==========================================
// Health Check Endpoint (เอาไว้เช็คว่า Server รันติดไหม)
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('🚀 Nexus API is running perfectly behind Nginx!');
});

// นำ Routes ทั้งหมดไปผูกกับ path /api
// ตัวอย่าง: /api/auth/login, /api/auth/register, /api/protected/profile
app.use('/api', routes);

// ==========================================
// Start Server
// ==========================================
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});