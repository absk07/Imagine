import { Router } from 'express';
const router = Router();
import userRoutes from './user';
import iamgeRoutes from './prompt';
import paymentRoutes from './payment';

router.use('/user', userRoutes);
router.use('/text-to-image', iamgeRoutes);
router.use('/buy-uc', paymentRoutes);

export default router;