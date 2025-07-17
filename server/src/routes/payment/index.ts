import { Router } from 'express';
import { payment, verifyPayment } from '../../controllers/payment';
import { verifyToken } from '../../middlewares/verifyToken';
const router = Router();

router.use(verifyToken);

router.post('/pay', payment);
router.post('/verify-pay', verifyPayment);

export default router;