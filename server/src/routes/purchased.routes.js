import { Router } from 'express';
import PurchasedController from '../controllers/purchased.controller.js';
import { authRequired } from '../middlewares/validateToken.middleware.js';
import { adminRequired } from '../middlewares/admin.middleware.js';

export const createPurchasedRouter = () => {
	const router = Router();

	const purchasedController = new PurchasedController();

	router.post('/purchases', adminRequired, purchasedController.getAll);
	router.post('/purchase', authRequired, purchasedController.getById);
	router.get('/purchases', authRequired, purchasedController.getByUserId);

	return router;
};
