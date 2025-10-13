import { Router } from 'express';
import TppController from '../controllers/tpp.controller.js';
import { authRequired } from '../middlewares/validateToken.middleware.js';
import { validateSchema } from '../middlewares/validator.middelware.js';
import { quickTppSchema, tppSchema } from '../schemas/tpp.schema.js';

export const createTppRouter = () => {
	const router = Router();

	const tppController = new TppController();

	router.post('/tpp/notify', tppController.getNotification);
	router.post(
		'/tpp/paymentlink',
		authRequired,
		validateSchema(tppSchema),
		tppController.create
	);
	router.post(
		'/tpp/quickpaymentlink',
		authRequired,
		validateSchema(quickTppSchema),
		tppController.createSingleProduct
	);

	return router;
};
