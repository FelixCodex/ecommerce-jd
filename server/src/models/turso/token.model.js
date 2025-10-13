import { connectDB } from '../../db.js';

const connection = await connectDB();

class TokenModel {
	static async saveToken(tokenStr) {
		const token = await connection.execute(
			'SELECT 1 FROM oauth_token WHERE id = 1'
		);

		if (token.rows[0]) {
			await connection.execute(
				'UPDATE oauth_token SET token = ? WHERE id = 1',
				[tokenStr]
			);
		} else {
			await connection.execute(
				'INSERT INTO oauth_token (id, token) VALUES (1, ?)',
				[tokenStr]
			);
		}
	}

	static async loadToken() {
		const token = await connection.execute(
			'SELECT token FROM oauth_token WHERE id = 1'
		);
		return token.rows[0] ? JSON.parse(token.rows[0].token) : null;
	}
}

export default TokenModel;
