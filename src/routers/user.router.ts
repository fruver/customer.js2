import {Router} from 'express';

import * as controller from '../controllers/user.controller';

const router = Router();

// Fruver Local
router.post('/users', controller.CreateUserWithEmailAndPasswordView);
router.post('/users/check', controller.UserEmailCheckView);

// Facebook Token
router.post('/users/fb');

// Twilio WhatsApp
router.post('/users/twilio/v1');

// Twilio SMS
router.post('/users/twilio/v2');

export default router;
