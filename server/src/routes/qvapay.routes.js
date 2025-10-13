import { Router } from 'express';
import QvaPayController from '../controllers/qvapay.controller.js';
import { authRequired } from '../middlewares/validateToken.middleware.js';

export const createQvaPayRouter = () => {
	const router = Router();

	const qvapay = new QvaPayController();

	router.post('/qvapay/notify', qvapay.getNotification);
	router.post('/qvapay/paymentlink', authRequired, qvapay.create);

	return router;
};
