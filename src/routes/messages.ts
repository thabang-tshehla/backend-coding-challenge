import { Router } from 'express';
import { getUserMessages, debugDecrypt,postMessage } from '../controllers/messages';

const router: Router = Router();

router.post('/', postMessage);
router.get('/:userId', getUserMessages);
router.post('/debug/decrypt', debugDecrypt);

export default router;