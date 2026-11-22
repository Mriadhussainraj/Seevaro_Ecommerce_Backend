import { Router } from 'express';
import { getAllUsers, getUserById } from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protect, authorize('admin'), getAllUsers);
router.get('/:id', protect, getUserById);

export default router;
