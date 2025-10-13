import jwt from 'jsonwebtoken';
import { ADMIN_TOKEN_ID, SECRET_JWT_KEY } from '../config.js';

export function adminRequired(req, res, next) {
	const { tokenadm } = req.cookies;
	// console.log(req.cookies);

	if (!tokenadm) return res.status(401).json({ error: 'Token not probided' });

	jwt.verify(tokenadm, SECRET_JWT_KEY, (err, user) => {
		if (err) {
			console.log('Something went wrong checking admin tokenadm');
			return res.status(403).json({ error: ['Invalid tokenadm'] });
		}
		if (user.payload.id == ADMIN_TOKEN_ID) {
			next();
		} else {
			return res
				.status(403)
				.json({ error: ['User not authenticated from tokenadm'] });
		}
	});
}
