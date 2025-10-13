import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config.js';

export function authRequired(req, res, next) {
	const { token } = req.cookies;

	if (!token) return res.status(401).json({ error: 'user not authenticated' });

	jwt.verify(token, SECRET_JWT_KEY, (err, user) => {
		if (err) {
			console.log('Something went wrong');
			return res.status(403).json({ error: ['Invalid token'] });
		}
		if (!user.payload.id) {
			return res
				.status(403)
				.json({ error: ['User not authenticated from token'] });
		}
		if (user.payload.id) {
			req.auth = user.payload;
			next();
		}
	});
}
