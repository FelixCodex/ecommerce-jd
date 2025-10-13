import { connectDB } from '../../db.js';
import { generateRandomCharacters } from '../../libs/utils.js';

const connection = await connectDB();

class CommentModel {
	static async getAll() {
		const purchase = await connection.execute(
			'SELECT id, HEX(userId) userId, userName, productId, comment, created_at FROM comments ORDER BY created_at desc'
		);

		return purchase.rows;
	}

	static async getById({ id }) {
		const purchase = await connection.execute(
			'SELECT id, HEX(userId) userId, userName, productId, comment, created_at FROM comments WHERE id = ?;',
			[id]
		);

		if (purchase.rows.length == 0) return { error: ['Purchase not found'] };

		return purchase.rows[0];
	}

	static async getByUserId({ id }) {
		const purchase = await connection.execute(
			'SELECT id, HEX(userId) userId, userName, productId, comment, created_at FROM comments WHERE userId = UNHEX(?);',
			[id]
		);

		return purchase.rows;
	}

	static async getByProductId({ id }) {
		const purchase = await connection.execute(
			'SELECT id, HEX(userId) userId, userName, productId, comment, created_at FROM comments WHERE productId = ?;',
			[id]
		);

		return purchase.rows;
	}

	static async create({ userId, userName, productId, message }) {
		try {
			const uuid = generateRandomCharacters(8);

			await connection.execute(
				`INSERT INTO comments(id, userId,userName, productId, comment) 
          VALUES(?,UNHEX(REPLACE("${userId}", "-","")),?,?, ?)`,
				[uuid, userName, productId, message]
			);

			const comment = await connection.execute(
				'SELECT id, HEX(userId) userId, userName, productId, comment, created_at FROM comments WHERE id = ?;',
				[uuid]
			);

			if (comment.rows.length == 0) return { error: ['Payment not found'] };

			return comment.rows[0];
		} catch (e) {
			console.log(e);
			return { error: ['Error while saving payment'] };
		}
	}

	static async update({ id, message }) {
		try {
			await connection.execute(`UPDATE comments SET comment=? WHERE id = ?`, [
				message,
				id,
			]);
			return {};
		} catch (e) {
			console.log(e);
			return { error: 'Error updating product' };
		}
	}

	static async deleteById({ id }) {
		try {
			await connection.execute(`DELETE FROM comments WHERE id = ?;`, [id]);
			return {};
		} catch (e) {
			console.log(e);
			return { error: 'Error deleting product' };
		}
	}

	static async deleteByUserId({ userId }) {
		try {
			await connection.execute(
				`DELETE FROM comments WHERE userId = UNHEX(?);`,
				[userId]
			);
			return {};
		} catch (e) {
			console.log(e);
			return { error: 'Error deleting product' };
		}
	}
}

export default CommentModel;
