import sgMail from '@sendgrid/mail';

import config from '../config';

sgMail.setApiKey(config.SENDGRID_API_KEY);

export const sendEmail = (email: string, subject: string, body: string) => {};

export const EmailVerificationTemplate = (email: string, key: string) => {};
