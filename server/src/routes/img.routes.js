import { Router } from 'express';
import ImgController from '../controllers/img.controller.js';

export const createImgRouter = () => {
	const router = Router();

	const imgController = new ImgController();

	router.get('/img/:id', imgController.getImgById);

	return router;
};
