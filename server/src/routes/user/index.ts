import { Router } from 'express';
const router = Router();
import { registerUser, loginUser } from '../../controllers/user';

router.post('/registerUser', registerUser);
router.post('/loginUser', loginUser);

export default router;