import { Router } from 'express';
import { payment } from '../../controllers/payment';
import { verifyToken } from '../../middlewares/verifyToken';
const router = Router();

router.use(verifyToken);

router.post('/pay', payment);

export default router;