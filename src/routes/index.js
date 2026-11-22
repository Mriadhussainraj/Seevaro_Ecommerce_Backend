import { Router } from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Seevaro API is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

// Modular Routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
