import { io } from 'socket.io-client';
import { useCallback, useEffect } from 'react';
import { useChat } from '../context/chat.context';
import { log_data } from '../utils';

const socket = io('https://modelfantasy.up.railway.app', {
	transports: ['websocket'],
	auth: {},
});

socket.on('connect_error', () => {});
socket.on('error', () => {});
socket.on('reconnect_error', () => {});
socket.on('reconnect_failed', () => {});

socket.on('connection', () => {
	log_data('Socket connected');
});

export function useSocket() {
	const { addMessageToChat } = useChat();

	useEffect(() => {
		const handleNewMessage = (message: string) => {
			const parsedMessage = JSON.parse(message);
			addMessageToChat(parsedMessage);
			const sound = new Audio('/message_alert.wav');
			sound.play();
		};

		socket.off('newMessage');
		socket.on('newMessage', handleNewMessage);

		return () => {
			socket.off('newMessage', handleNewMessage);
		};
	}, [addMessageToChat]);

	const connectUserToMessageChannel = useCallback(({ id }: { id: string }) => {
		socket.disconnect();
		socket.auth = { userId: id };
		socket.connect();

		socket.emit('connectChat');
		log_data('Chat connected');
	}, []);

	return { connectUserToMessageChannel };
}
