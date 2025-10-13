import { io } from 'socket.io-client';
import { useChat } from './useChat';
import { useEffect } from 'react';
import { API_URL } from '../consts';

const socket = io(API_URL, {
	transports: ['websocket'],
});

export function useSocket() {
	const { addMessageToChat, addChatToUserChats, setUserCardToNotSeen } =
		useChat();

	useEffect(() => {
		const handleNewMessage = (message: string) => {
			console.log('----------------------------------------------');
			console.log('New message: ', message);
			addMessageToChat(JSON.parse(message));
			setUserCardToNotSeen(JSON.parse(message).userId);
		};
		const handleNewChat = (message: string, chat: string) => {
			console.log('----------------------------------------------');
			console.log('New Chat: ', chat);
			console.log('New message: ', message);
			const chatParsed = JSON.parse(chat);
			addChatToUserChats({ ...chatParsed, seen: JSON.parse(chatParsed.seen) });
			addMessageToChat(JSON.parse(message));
		};

		socket.off('newChat');
		socket.on('newChat', handleNewChat);

		socket.off('newMessage');
		socket.on('newMessage', handleNewMessage);

		return () => {
			socket.off('newChat', handleNewChat);
			socket.off('newMessage', handleNewMessage);
		};
	}, [addChatToUserChats, addMessageToChat, setUserCardToNotSeen]);

	const connectAdmin = () => {
		socket.emit('connectAdmin');

		socket.on('connect', () => {
			console.log('Admin socket connected');
			socket.emit('connectAdmin'); // Unir admin a la sala
		});
	};

	const emitSeen = (uuid: string) => {
		socket.emit('setChatSeen', uuid);
	};

	return { connectAdmin, emitSeen };
}
