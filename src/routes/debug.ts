import { Router } from 'express';
import { debugDecrypt } from '@/controllers/debug';

const router: Router = Router();

router.post('/decrypt', debugDecrypt);

export default router;