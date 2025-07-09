import { Router } from 'express';
const router = Router();
import { registerUser } from '../../controllers/user';

router.post('/registerUser', registerUser);

export default router;