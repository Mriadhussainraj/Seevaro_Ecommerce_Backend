import { Router } from 'express';
import {
  googleAuth,
  register,
  login,
  getProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Primary Google Authentication Route (Sign In / Sign Up)
router.post('/google', googleAuth);

// Optional fallback routes
router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);

export default router;
