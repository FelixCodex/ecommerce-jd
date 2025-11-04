import dotenv from 'dotenv';

dotenv.config();

export const DB_CONNECTION_DATA = {
	host: process.env.MYSQLHOST,
	user: process.env.MYSQLUSER,
	port: process.env.MYSQLPORT,
	database: process.env.MYSQLDATABASE,
	password: process.env.MYSQLPASSWORD,
};

export const CORS_CONFIG = {
	origin: [
		'http://localhost:5173',
		'http://localhost:5174',
		'https://modelstore.pages.dev',
		'https://adminmodelstore.pages.dev',
		'https://javierdavid.org',
		'https://javier-david.com',
		'https://h6g-adm-j.pages.dev',
	],
	credentials: true,
};

export const CLIENT_URL = 'https://javier-david.com/';

export const SERVER_URL = 'https://modelfantasy.up.railway.app/';

export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;

export const TURSO_URL = process.env.TURSO_URL;
export const TURSO_AUTH = process.env.TURSO_AUTH;

export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;

export const ADMIN_HASH_PASSWORD = process.env.ADMIN_HASH_PASSWORD;
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
export const ADMIN_TOKEN_ID = process.env.ADMIN_TOKEN_ID;

export const TPP_CLIENT_ID = process.env.TPP_CLIENT_ID;
export const TPP_CLIENT_SECRET = process.env.TPP_CLIENT_SECRET;

export const QVAPAY_CLIENT_ID = process.env.QVAPAY_CLIENT_ID;
export const QVAPAY_CLIENT_SECRET = process.env.QVAPAY_CLIENT_SECRET;

export const OAUTH_REDIRECT_URI =
	'https://javier-david.com/app/d/oauth2callback';
