import { Router } from 'express';
const router = Router();
import userRegisterRoute from './user';

router.use('/', userRegisterRoute);

export default router;