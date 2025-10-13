import {
	ADMIN_HASH_PASSWORD,
	ADMIN_TOKEN_ID,
	ADMIN_USERNAME,
	SECRET_JWT_KEY,
} from '../config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const ERROR_ADMIN_NOT_AUTHORIZED = 'Must be admin';

export async function createAccessToken(payload) {
	return new Promise((resolve, reject) => {
		jwt.sign(
			{ payload },
			SECRET_JWT_KEY,
			{
				expiresIn: '2d',
			},
			(err, token) => {
				if (err) reject(err);
				resolve(token);
			}
		);
	});
}

export async function authenticateUser(req) {
	const { token } = req.cookies;

	if (!token) return { error: ['User not authenticated'], status: 403 };

	return jwt.verify(token, SECRET_JWT_KEY, async (err, user) => {
		if (err) {
			console.log('Something went wrong');
			console.log('Err: ', err);
			return { error: ['User not authenticated from token'], status: 401 };
		}
		if (user.payload.id) {
			return user.payload;
		}
		return { error: ['User not authenticated from token'], status: 401 };
	});
}

export async function checkAdminCredentials(username, password) {
	const matchUsername = username == ADMIN_USERNAME;
	const matchPass = await bcrypt.compare(password, `${ADMIN_HASH_PASSWORD}`);
	if (matchUsername && matchPass) {
		return true;
	}
	return false;
}

export async function checkAdminToken(req) {
	const { token } = req.cookies;
	if (!token) return false;

	return jwt.verify(token, SECRET_JWT_KEY, async (err, user) => {
		if (err) {
			console.log('Something went wrong checking admin token');
			console.log('Err: ', err);
			return { isAdmin: false, error: ERROR_ADMIN_NOT_AUTHORIZED };
		}
		if (user.payload.id == ADMIN_TOKEN_ID) {
			return { isAdmin: true, error: '' };
		}
		return { isAdmin: false, error: ERROR_ADMIN_NOT_AUTHORIZED };
	});
}
