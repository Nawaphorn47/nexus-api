// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate เบื้องต้น
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    // เรียกใช้ Service
    const user = await authService.registerUser(email, password);
    res.status(201).json({ message: 'User registered successfully', user });
    
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    // เรียกใช้ Service
    const data = await authService.loginUser(email, password);
    res.status(200).json({ message: 'Login successful', ...data });

  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};