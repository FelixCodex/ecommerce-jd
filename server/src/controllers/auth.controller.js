import { ADMIN_TOKEN_ID } from '../config.js';
import { checkAdminCredentials, createAccessToken } from '../libs/jwt.js';
import UserModel from '../models/turso/user.model.js';

class AuthController {
	register = async (req, res) => {
		const { username, password, email, remember } = req.body;

		const response = await UserModel.create({
			input: { username, password, email, fromGoogle: 'true' },
		});

		if (response.error) return res.status(500).send(response.error);

		const token = await createAccessToken({ id: response.id });

		const time = remember ? 1000 * 60 * 60 * 24 * 50 : 1000 * 60 * 60 * 24 * 2;

		res.cookie('token', token, {
			httpOnly: true,
			// secure: process.env.NODE_ENV == 'production',
			secure: true,
			sameSite: 'none',
			maxAge: time,
		});
		res.status(201).json(response);
	};

	login = async (req, res) => {
		const { email, password, remember } = req.body;

		const response = await UserModel.authenticate({
			input: { email, password },
		});

		if (response.message) return res.status(406).send(response);
		if (response.error) return res.status(400).send(response.error);

		const token = await createAccessToken({ id: response.id });

		const time = remember ? 1000 * 60 * 60 * 24 * 50 : 1000 * 60 * 60 * 24 * 2;

		res.cookie('token', token, {
			httpOnly: true,
			// secure: process.env.NODE_ENV == 'production',
			secure: true,
			sameSite: 'none',
			maxAge: time,
		});
		res.json(response);
	};

	logout = async (req, res) => {
		res.cookie('token', '', {
			httpOnly: true,
			// secure: process.env.NODE_ENV == 'production',
			secure: true,
			sameSite: 'none',
			maxAge: 10,
		});
		res.status(200);
		req.logout(() => {
			res.json({ message: 'Logout exitoso' });
		});
	};

	verify = async (req, res) => {
		const auth = req.auth;

		console.log('auth: ', auth);
		const userFound = await UserModel.getById(auth);
		if (!userFound || userFound.error)
			return res
				.status(404)
				.cookie('token', '', {
					httpOnly: true,
					// secure: process.env.NODE_ENV == 'production',
					secure: true,
					sameSite: 'none',
					maxAge: 1000,
				})
				.send({ error: ['User not found'] });

		return res.send({
			id: userFound.id,
			username: userFound.username,
			email: userFound.email,
			preferences: JSON.parse(userFound.preferences),
		});
	};

	loginAdmin = async (req, res) => {
		const { username, password, remember } = req.body;

		const match = checkAdminCredentials(username, password);
		if (!match) return res.status(403).send(response);

		const token = await createAccessToken({ id: ADMIN_TOKEN_ID });

		const time = remember ? 1000 * 60 * 60 * 24 * 50 : 1000 * 60 * 60 * 24 * 2;

		res.cookie('tokenadm', token, {
			httpOnly: true,
			// secure: process.env.NODE_ENV == 'production',
			secure: true,
			sameSite: 'none',
			maxAge: time,
		});
		res.json({ message: 'Login exitoso' });
	};

	verifyAdmin = async (req, res) => {
		return res.send({ message: 'Welcome admin' });
	};
}

export default AuthController;
