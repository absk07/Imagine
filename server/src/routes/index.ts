import { Router } from 'express';
const router = Router();
import userRoutes from './user';

router.use('/user', userRoutes);

export default router;