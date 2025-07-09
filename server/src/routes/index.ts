import { Router } from 'express';
const router = Router();
import userRegisterRoute from './user';

router.use('/user', userRegisterRoute);

export default router;