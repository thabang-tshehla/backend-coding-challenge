import { Router } from 'express';
import { getUserMessages, debugDecrypt } from '../controllers/messages';

const router: Router = Router();

router.get('/messages/:userId', getUserMessages);
router.post('/debug/decrypt', debugDecrypt);

export default router;