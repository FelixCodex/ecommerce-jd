import { Router } from 'express';
import ChatController from '../controllers/chat.controller.js';
import { authRequired } from '../middlewares/validateToken.middleware.js';
import { adminRequired } from '../middlewares/admin.middleware.js';

export const createChatRouter = () => {
	const router = Router();

	const chatController = new ChatController();

	router.get('/chats', adminRequired, chatController.getUserChats);
	router.get('/messages', adminRequired, chatController.getChats);
	router.post(
		'/message/adm/create',
		adminRequired,
		chatController.createAdminNewMessage
	);
	router.post('/message/create', authRequired, chatController.createNewMessage);
	router.get('/messages/user', authRequired, chatController.getMessageByUserId);

	return router;
};
