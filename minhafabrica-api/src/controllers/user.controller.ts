import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import User from '../models/User';

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuarios', error });
  }
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuario nao encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuario', error });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuario nao encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuario', error });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario nao encontrado' });
    res.json({ message: 'Usuario deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuario', error });
  }
};
