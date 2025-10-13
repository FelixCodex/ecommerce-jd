import { Router } from 'express';
import SendMailController from '../controllers/sendMail.controller.js';

export const createSendMailRouter = () => {
	const router = Router();

	const sendMailController = new SendMailController();

	router.post('/send-mail', sendMailController.sendMail);

	return router;
};
