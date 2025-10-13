import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.middleware.js';
import CommentController from '../controllers/comment.controller.js';
import { adminRequired } from '../middlewares/admin.middleware.js';

export const createCommentRouter = () => {
	const router = Router();

	const commentController = new CommentController();

	router.get('/comments', adminRequired, commentController.getAll);
	router.post('/comment/create', authRequired, commentController.create);
	router.post('/comment/update', authRequired, commentController.update);
	router.post('/comment/remove', authRequired, commentController.delete);

	return router;
};
