import { Router } from 'express';
import { generateImage } from '../../controllers/image';
import { verifyToken } from '../../middlewares/verifyToken';
const router = Router();

router.use(verifyToken);

router.post('/generate-image', generateImage);

export default router;