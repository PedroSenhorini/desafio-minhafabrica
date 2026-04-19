import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email ja cadastrado' });
    const user = await User.create({ name, email, password, role });
    console.log('Usuario criado:', user);
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user._id.toString(), user.role as string),
    });
  } catch (error) {
    console.error('ERRO REGISTER:', error);
    res.status(500).json({ message: 'Erro ao registrar usuario', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Credenciais invalidas' });
    const isMatch = await (user as any).comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Credenciais invalidas' });
    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user._id.toString(), user.role as string),
    });
  } catch (error) {
    console.error('ERRO LOGIN:', error);
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
};
