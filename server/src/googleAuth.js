import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import UserModel from './models/turso/user.model.js';
import { generateRandomPassword } from './libs/utils.js';
import { CLIENT_URL } from './config.js';

const POSSIBLE_ERRORS = [
	'User not found',
	'Username already exists',
	'Email already exists',
];

dotenv.config();

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: CLIENT_URL + 'app/auth/google/callback',
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				// Aquí puedes verificar o guardar el usuario en SQLite
				const googleUser = {
					id: profile.id,
					name: profile.displayName,
					email: profile.emails?.[0]?.value,
				};

				const response = await UserModel.getByEmail({
					email: googleUser.email,
				});

				if (response.error) {
					if (response.error[0] == 'User not found') {
						const password = generateRandomPassword(20);

						const user = await UserModel.create({
							input: {
								username: googleUser.name,
								password,
								email: googleUser.email,
								fromGoogle: 'true',
							},
						});

						if (user.error) throw new Error(user.error[0]);

						return done(null, user);
					}

					throw new Error(response.error[0]);
				}

				if (response.fromGoogle == 'false')
					throw new Error('Email already exists');

				const user = response;

				return done(null, user);
			} catch (err) {
				console.log(err);
				const error = POSSIBLE_ERRORS.includes(err.message)
					? err
					: new Error('No se pudo autenticar con Google');
				return done(null, false, { message: error.message });
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((obj, done) => {
	done(null, obj);
});

export default passport;
