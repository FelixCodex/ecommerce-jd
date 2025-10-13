import ChatModel from '../models/turso/chat.model.js';
import crypto from 'node:crypto';
import PaymentModel from '../models/turso/payment.model.js';
import { getIO } from '../socket.io.js';

class ChatController {
	getChats = async (req, res) => {
		const response = await ChatModel.getAllMessages();
		if (response.error) return res.status(500).send(response.error);

		return res.json(response);
	};

	getUserChats = async (req, res) => {
		const response = await ChatModel.getAllChats();
		if (response.error) return res.status(500).send(response.error);

		return res.json(response);
	};

	getById = async (req, res) => {
		const { id } = req.body;

		const response = await ChatModel.getById({ id });
		if (response.error) return res.status(500).send(response.error);

		return res.json(response);
	};

	getMessageByUserId = async (req, res) => {
		const { id } = req.auth;

		const response = await ChatModel.getMessageByUserId({ id });
		if (response.error) return res.status(500).send(response.error);

		return res.json(response);
	};

	getChatByUserId = async (req, res) => {
		const { id } = req.body;

		const response = await ChatModel.getChatByUserId({ id });
		if (response.error) return res.status(500).send(response.error);

		return res.json(response);
	};

	createNewMessage = async (req, res) => {
		const io = getIO();
		const { message } = req.body;
		const { id } = req.auth;

		const userChats = await ChatModel.getChatByUserId({ id });

		const uuidRaw = crypto.randomUUID();
		const chatUuidRaw = crypto.randomUUID();

		const uuid = await PaymentModel.getHexUUID({ uuid: uuidRaw });
		const chatUuid = await PaymentModel.getHexUUID({ uuid: chatUuidRaw });

		const date = await PaymentModel.getDateTime();

		const messageToEmit = {
			id: uuid,
			userId: id,
			isMessageFromUser: 'true',
			message,
			created_at: date,
		};

		if (userChats.length != 0) {
			const userChats = await ChatModel.createNewMessage({
				uuid: uuidRaw,
				userId: id,
				message,
			});

			if (userChats.error) return res.status(500).send(userChats.error);

			ChatModel.setUnseen({ userId: id });

			io.to('admin').emit('newMessage', JSON.stringify(messageToEmit));

			return res.status(200).send();
		} else {
			const userChats = await ChatModel.createNewChat({
				uuid: uuidRaw,
				chatId: chatUuidRaw,
				userId: id,
				message,
			});

			if (userChats.error) return res.status(500).send(userChats.error);

			const chatToEmit = {
				id: chatUuid,
				userId: id,
				seen: 'false',
			};

			io.to('admin').emit(
				'newChat',
				JSON.stringify(messageToEmit),
				JSON.stringify(chatToEmit)
			);

			return res.status(200).send();
		}
	};

	createAdminNewMessage = async (req, res) => {
		const io = getIO();
		const { id, message } = req.body;

		const userChats = await ChatModel.getChatByUserId({ id });

		if (userChats.length != 0) {
			const uuidRaw = crypto.randomUUID();
			const uuid = await PaymentModel.getHexUUID({ uuid: uuidRaw });

			const userChats = await ChatModel.createAdminNewMessage({
				uuid: uuidRaw,
				userId: id,
				message,
			});

			if (userChats.error) return res.status(500).send(userChats.error);

			const date = await PaymentModel.getDateTime();

			const messageToEmit = {
				id: uuid,
				userId: id,
				isMessageFromUser: 'false',
				message,
				created_at: date,
			};

			io.to(id).emit('newMessage', JSON.stringify(messageToEmit));

			return res.status(200).send();
		}
		return res.status(500).send({ error: ['User has no chat'] });
	};
}

export default ChatController;
