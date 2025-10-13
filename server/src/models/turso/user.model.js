import { connectDB } from '../../db.js';
import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import PaymentModel from './payment.model.js';

const connection = await connectDB();

class UserModel {
	static async getAll() {
		const user = await connection.execute(
			'SELECT HEX(id) id, username, email, created_at FROM users'
		);
		if (user.rows.length == 0) return { error: ['User not found'] };

		return user.rows;
	}

	static async getById({ id }) {
		const user = await connection.execute(
			'SELECT HEX(id) id, username, email, preferences FROM users WHERE id = UNHEX(?);',
			[id]
		);
		if (user.rows.length == 0) return { error: ['User not found'] };

		return user.rows[0];
	}

	static async getByEmail({ email }) {
		const user = await connection.execute(
			'SELECT HEX(id) id, username, email, preferences, fromGoogle FROM users WHERE email = ?;',
			[email]
		);
		if (user.rows.length == 0) return { error: ['User not found'] };

		return user.rows[0];
	}

	static async getByIdWithCart({ id }) {
		const user = await connection.execute(
			'SELECT HEX(id) id, username, email, preferences, cart FROM users WHERE id = UNHEX(?);',
			[id]
		);
		if (user.rows.length == 0) return { error: ['User not found'] };

		return user.rows[0];
	}

	static async getCartById({ id }) {
		const cart = await connection.execute(
			'SELECT cart FROM users WHERE id = UNHEX(?);',
			[id]
		);

		if (cart.rows.length == 0) return { error: ['User not found'] };

		return JSON.parse(cart.rows[0].cart);
	}

	static async create({ input }) {
		const { username, password, email, fromGoogle } = input;

		const errors = [];
		if (await Validate.emailsInDB(email)) errors.push('Email already exists');
		console.log('Errors: ', errors);

		if (errors.length > 0) return { error: errors };

		try {
			const uuid = crypto.randomUUID();
			console.log('UUID generated: ', uuid);
			const uuidHex = await PaymentModel.getHexUUID({ uuid });

			const encryptedPass = await bcrypt.hash(password, 14);
			console.log('Password encrypted');

			const preferences = JSON.stringify({
				language: 'en',
				currency: 'EUR',
				notifications: true,
			});

			await connection.execute(
				`INSERT INTO users(id, username, password, email, preferences, fromGoogle) 
          VALUES(UNHEX(REPLACE("${uuid}", "-","")),?,?,?,?,?)`,
				[username, encryptedPass, email, preferences, fromGoogle]
			);
			console.log('Insert executed');

			console.log('User created successfully, sending back response');

			return {
				id: uuidHex,
				username,
				email,
				preferences: JSON.parse(preferences),
			};
		} catch (e) {
			console.log(e);
			return { error: ['Error while saving user'] };
		}
	}

	static async authenticate({ input }) {
		const { password, email } = input;

		const user = await connection.execute(
			'SELECT HEX(id) id, username, email, password, preferences FROM users WHERE email = ?;',
			[email]
		);

		if (user.rows.length == 0) return { error: ['User not found'] };

		const isMatch = await bcrypt.compare(password, `${user.rows[0].password}`);

		console.log('IsMath: ', isMatch);
		console.log('Password: ', password);
		console.log('User password: ', user.rows[0].password);

		if (!isMatch) return { error: ['Password does not match'] };

		console.log(user.rows[0]);

		return {
			id: user.rows[0].id,
			username: user.rows[0].username,
			email: user.rows[0].email,
			preferences: JSON.parse(user.rows[0].preferences),
		};
	}

	static async preferences({ preferences, id }) {
		await connection.execute(
			'UPDATE users SET preferences=? WHERE id = UNHEX(?);',
			[preferences, id]
		);
	}

	static async updateCart({ id, value }) {
		await connection.execute('UPDATE users SET cart=? WHERE id = UNHEX(?);', [
			value,
			id,
		]);
	}

	static async clearCart({ id }) {
		await connection.execute(
			"UPDATE users SET cart='[]' WHERE id = UNHEX(?);",
			[id]
		);
	}

	static async delete({ id }) {
		try {
			await connection.execute(`DELETE FROM comments WHERE id = UNHEX(?);`, [
				id,
			]);
		} catch (e) {
			console.log(e);
		}
	}
}

class Validate {
	static async usernameInDB(username) {
		const users = await connection.execute(
			`SELECT * FROM users where username = ?`,
			[username]
		);

		if (users.rows.length == 0) return false;
		return true;
	}

	static async emailsInDB(email) {
		const users = await connection.execute(
			`SELECT * FROM users where email = ?`,
			[email]
		);

		if (users.rows.length == 0) return false;
		return true;
	}
}

export default UserModel;
