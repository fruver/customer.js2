import {Router} from 'express';
import * as controller from '../controllers/token.controller';

const router: Router = Router();

router.post('/token', controller.CreateTokenView);

export default router;
