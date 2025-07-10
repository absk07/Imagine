import { Router } from 'express';
const router = Router();
import userRoutes from './user';
import iamgeRoutes from './prompt';

router.use('/user', userRoutes);
router.use('/text-to-image', iamgeRoutes);

export default router;