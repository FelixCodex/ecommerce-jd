import { connectDB } from '../../db.js';

const connection = await connectDB();

class ChatModel {
	static async getAllChats() {
		const product = await connection.execute(
			'SELECT HEX(id) id, HEX(userId) userId, seen FROM userChats;'
		);

		if (product.rows.length == 0) return { error: ['Chat not found'] };

		return product.rows;
	}

	static async getAllMessages() {
		const product = await connection.execute(
			'SELECT HEX(id) id, HEX(userId) userId, isMessageFromUser, message ,created_at FROM chats ORDER BY `created_at` asc;'
		);

		if (product.rows.length == 0) return { error: ['Chat not found'] };

		return product.rows;
	}

	static async getById({ id }) {
		const product = await connection.execute(
			'SELECT HEX(id) id, HEX(userId) userId, isMessageFromUser, message ,created_at FROM chats WHERE id = UNHEX(?)',
			[id]
		);

		if (product.rows.length == 0) return { error: ['Chat not found'] };

		return product.rows;
	}

	static async getMessageByUserId({ id }) {
		const product = await connection.execute(
			'SELECT HEX(id) id, HEX(userId) userId, isMessageFromUser, message ,created_at FROM chats WHERE userId = UNHEX(?) ORDER BY `created_at` asc;',
			[id]
		);
		if (product.rows.length == 0) return { error: ['Chat not found'] };

		return product.rows;
	}

	static async getChatByUserId({ id }) {
		const product = await connection.execute(
			'SELECT HEX(id) id, HEX(userId) userId, seen FROM userChats WHERE userId = UNHEX(?)',
			[id]
		);

		return product.rows;
	}

	static async createNewMessage({ uuid, userId, message }) {
		try {
			await connection.execute(
				`INSERT INTO chats(id, userId, message) 
          VALUES(UNHEX(REPLACE("${uuid}", "-","")), UNHEX(REPLACE("${userId}", "-","")),?)`,
				[message]
			);
			return {};
		} catch (e) {
			console.log(e);
			return { error: ['Error while new message'] };
		}
	}

	static async createAdminNewMessage({ uuid, userId, message }) {
		try {
			await connection.execute(
				`INSERT INTO chats(id, userId, message, isMessageFromUser) 
          VALUES(UNHEX(REPLACE("${uuid}", "-","")), UNHEX(REPLACE("${userId}", "-","")),?,"false")`,
				[message]
			);
			return {};
		} catch (e) {
			console.log(e);
			return { error: ['Error while new message'] };
		}
	}

	static async createNewChat({ uuid, chatId, userId, message }) {
		try {
			await connection.execute(
				`INSERT INTO userChats(id, userId) 
          VALUES(UNHEX(REPLACE("${chatId}", "-","")), UNHEX(REPLACE("${userId}", "-","")));`
			);
			await connection.execute(
				`INSERT INTO chats(id, userId, message) 
          VALUES(UNHEX(REPLACE("${uuid}", "-","")), UNHEX(REPLACE("${userId}", "-","")),?);`,
				[message]
			);
			return {};
		} catch (e) {
			console.log(e);
			return { error: ['Error while saving new chat'] };
		}
	}

	static async setSeen({ id }) {
		await connection.execute(
			"UPDATE userChats SET seen='true' WHERE id = UNHEX(?);",
			[id]
		);
	}

	static async setUnseen({ userId }) {
		try {
			await connection.execute(
				"UPDATE userChats SET seen='false' WHERE userId = UNHEX(?);",
				[userId]
			);
		} catch (err) {
			console.log(err);
		}
	}

	static async deleteChatByUserId({ userId }) {
		try {
			await connection.execute(
				'DELETE FROM userChats WHERE userId = UNHEX(?);',
				[userId]
			);
		} catch (err) {
			console.log(err);
		}
	}

	static async deleteChatById({ id }) {
		try {
			await connection.execute('DELETE FROM userChats WHERE id = UNHEX(?);', [
				id,
			]);
		} catch (err) {
			console.log(err);
		}
	}

	static async deleteMessagesByUserId({ userId }) {
		try {
			await connection.execute('DELETE FROM chats WHERE userId = UNHEX(?);', [
				userId,
			]);
		} catch (err) {
			console.log(err);
		}
	}

	static async deleteMessageById({ id }) {
		try {
			await connection.execute('DELETE FROM chats WHERE id = UNHEX(?);', [id]);
		} catch (err) {
			console.log(err);
		}
	}
}

export default ChatModel;
