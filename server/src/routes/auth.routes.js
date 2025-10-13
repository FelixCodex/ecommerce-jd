import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import { validateSchema } from '../middlewares/validator.middelware.js';
import { adminRequired } from '../middlewares/admin.middleware.js';
import {
	loginAdminSchema,
	loginSchema,
	registerSchema,
} from '../schemas/auth.schema.js';
import { authRequired } from '../middlewares/validateToken.middleware.js';

export const createAuthRouter = () => {
	const router = Router();

	const authController = new AuthController();

	router.post(
		'/register',
		validateSchema(registerSchema),
		authController.register
	);
	router.post('/login', validateSchema(loginSchema), authController.login);
	router.post(
		'/loginadmin',
		validateSchema(loginAdminSchema),
		authController.loginAdmin
	);
	router.get('/logout', authController.logout);
	router.get('/verify', authRequired, authController.verify);
	router.get('/verifyAdmin', adminRequired, authController.verifyAdmin);

	return router;
};
