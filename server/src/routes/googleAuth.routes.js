import { Router } from 'express';
import passport from '../googleAuth.js';
import { createAccessToken } from '../libs/jwt.js';
import { CLIENT_URL } from '../config.js';

export const createGoogleAuthRouter = () => {
	const router = Router();

	// Iniciar la autenticación con Google
	router.get(
		'/auth/google',
		passport.authenticate('google', { scope: ['profile', 'email'] })
	);

	// Callback de autenticación
	router.get(
		'/auth/google/callback',
		passport.authenticate('google', {
			successRedirect: '/app/auth/success',
			failureRedirect: '/app/auth/failure',
			failureMessage: true,
			failureFlash: true,
		})
	);

	// Ruta de éxito
	router.get('/auth/success', async (req, res) => {
		console.log('Autenticacion existosa');
		console.log('Req user: ', req.user);
		if (!req.user) {
			return res.redirect(
				`${CLIENT_URL}login?error=${encodeURIComponent(req.errorMessage)}`
			);
		}

		const token = await createAccessToken({ id: req.user.id });

		const time = 1000 * 60 * 60 * 24 * 38;

		res.cookie('token', token, {
			httpOnly: false,
			secure: process.env.NODE_ENV == 'production',
			sameSite: 'none',
			maxAge: time,
		});
		return res.redirect(`${CLIENT_URL}`);
	});

	// Ruta de fallo
	router.get('/auth/failure', (req, res) => {
		console.log('Mensajes de error en la sesión:', req.session.messages);

		const errorMessage = req.session.messages?.[0] || 'Error desconocido';

		console.log('Autenticación fallida:', errorMessage);

		res.redirect(
			`${CLIENT_URL}login?error=${encodeURIComponent(errorMessage)}`
		);
	});

	return router;
};
