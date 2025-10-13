import { Router } from 'express';
import BeneficiaryController from '../controllers/beneficiary.controller.js';
import { adminRequired } from '../middlewares/admin.middleware.js';

export const createBeneficiaryRouter = () => {
	const router = Router();

	const chatController = new BeneficiaryController();

	router.get('/beneficiaries', adminRequired, chatController.getAll);
	router.post('/beneficiary', adminRequired, chatController.getById);
	router.post('/beneficiary/create', adminRequired, chatController.create);
	router.post('/beneficiary/delete', adminRequired, chatController.delete);
	router.post('/beneficiary/pay', adminRequired, chatController.pay);

	return router;
};
