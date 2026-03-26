// src/services/auth.service.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export const registerUser = async (email: string, password: string) => {
  // 1. เช็คว่ามีอีเมลนี้ในระบบหรือยัง
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  // 2. แฮชรหัสผ่านก่อนบันทึกลง Database (อย่าเก็บ Plain text เด็ดขาด!)
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // 3. บันทึก User ลง Database ผ่าน Prisma
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // คืนค่ากลับไปแค่ข้อมูลที่ปลอดภัย (ไม่ส่งรหัสผ่านกลับไป)
  return {
    id: newUser.id,
    email: newUser.email,
  };
};

export const loginUser = async (email: string, password: string) => {
  // 1. ค้นหา User จากอีเมล
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // 2. เปรียบเทียบรหัสผ่านที่ส่งมา กับที่แฮชไว้ใน Database
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // 3. สร้าง JWT Token อายุ 1 วัน
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: '1d',
  });

  return {
    user: { id: user.id, email: user.email },
    token,
  };
};