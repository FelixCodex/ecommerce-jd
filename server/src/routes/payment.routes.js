import { Router } from 'express';
import PaymentController from '../controllers/payment.controller.js';
import { authRequired } from '../middlewares/validateToken.middleware.js';
import { adminRequired } from '../middlewares/admin.middleware.js';

export const createPaymentRouter = () => {
	const router = Router();

	const payController = new PaymentController();

	router.get('/payments', authRequired, payController.getByUserId);
	router.get('/paymentsall', adminRequired, payController.getAll);
	router.post('/payment', authRequired, payController.getById);
	router.post('/paymentui', authRequired, payController.getByUserIdAndId);

	return router;
};
