import { Router } from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller';
import { authenticate, isAdmin } from '../middlewares/auth';
const router = Router();
router.get('/', authenticate, isAdmin, getUsers);
router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, isAdmin, updateUser);
router.delete('/:id', authenticate, isAdmin, deleteUser);
export default router;
