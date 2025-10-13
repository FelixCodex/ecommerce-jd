import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.middleware.js';
import DriveController from '../controllers/drive.controller.js';
import { adminRequired } from '../middlewares/admin.middleware.js';

export const createDownloadRouter = () => {
	const router = Router();

	const driveController = new DriveController();

	router.get('/download/:id', authRequired, driveController.downloadFile);
	router.get('/d/oauth2callback', driveController.oAuth2Callback);
	router.get('/d/auth', adminRequired, driveController.authRedirect);

	return router;
};
