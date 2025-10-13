import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import { authRequired } from '../middlewares/validateToken.middleware.js';
import { adminRequired } from '../middlewares/admin.middleware.js';

export const createUserRouter = () => {
	const router = Router();

	const userController = new UserController();

	router.get('/cart', authRequired, userController.getCart);
	router.get('/users', adminRequired, userController.getAll);
	router.get('/user/delete', adminRequired, userController.delete);
	router.get('/rate', userController.getRate);
	router.post('/cart/add', authRequired, userController.add);
	router.post('/cart/remove', authRequired, userController.remove);
	router.post('/preferences', authRequired, userController.preferences);

	return router;
};
