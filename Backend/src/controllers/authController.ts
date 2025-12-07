import type { Request, Response } from 'express';
import { signupSchema, loginSchema } from '../utils/validation';
import { registerUser, loginUser } from '../services/authService';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
  try {
    const validation = signupSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ error: validation.error.issues[0]?.message || 'Invalid input' });
      return;
    }

    const { email, password } = validation.data;
    await registerUser(email, password);
      console.log("User registered successfully");
     fetch(process.env.N8N_WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch((err)=> console.log("Webhook error:", err)); 

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error: any) {
    const status = error.message === 'User already exists' ? 400 : 500;
    return  res.status(status).json({ error: error.message  });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ error: 'Invalid input' });
      return;
    }

    const { email, password } = validation.data;
    const user = await loginUser(email, password);
    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET || 'secret', 
      { expiresIn: '1h' }
    );
    res.cookie('token', token, {
      httpOnly: true,                    
      secure: true, 
      sameSite: 'none',                
      maxAge: 60 * 60 * 1000             
    });

    return res.json({ message: 'Login successful', user: { email: user.email } });
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Login Unsuccessful" } );
  }
};

export const logout = (req: Request, res: Response) => {
  try{

    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none' 
    });
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error:any) {
    return res.status(500).json({ error: "Logout Unsuccessful" });
  }
};