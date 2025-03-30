import { Router } from 'express';
import { getUserMessages, postMessage } from '../controllers/messages';

const router: Router = Router();

router.post('/', postMessage);
router.get('/:userId', getUserMessages);

export default router;