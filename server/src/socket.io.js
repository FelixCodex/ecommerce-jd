import { Server } from 'socket.io';
import ChatModel from './models/turso/chat.model.js';

let io;

export function initSocket(server) {
	io = new Server(server, {
		cors: {
			origin: [
				'http://localhost:5173',
				'http://localhost:5174',
				'https://modelstore.pages.dev',
				'https://adminmodelstore.pages.dev',
				'https://javierdavid.org',
				'https://javier-david.com',
			],
			credentials: true,
		},
	});

	let usersConnected = 0;

	io.on('connection', socket => {
		usersConnected++;
		console.log('A user has connected: ' + socket.id);
		socket.to('admin').emit('userConnected', usersConnected);

		const userId = socket.handshake.auth.userId;
		if (userId) {
			socket.join(userId);
			console.log(`User ${userId} joined room ${userId}`);
		}

		// Evento para conectar usuario a su chat
		socket.on('connectChat', () => {
			let userId = socket.handshake.auth.userId;
			if (userId) {
				socket.join(userId);
				console.log(`User ${userId} connected to chat`);
			}
		});

		socket.on('disconnect', () => {
			console.log('A user has disconnected');
			usersConnected--;
			io.to('admin').emit('userDisconnected', usersConnected);
		});

		socket.on('connectAdmin', () => {
			socket.join('admin');
			console.log('Admin connected to chat');
			io.to('admin').emit('connectAdmin', 'Admin joined chat');
		});

		socket.on('setChatSeen', uuid => {
			ChatModel.setSeen({ id: uuid });
		});
	});
}

export function getIO() {
	return io;
}
