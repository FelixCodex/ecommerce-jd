import { google } from 'googleapis';
import credentials from '../credentials.json' with { type: 'json' };
import TokenModel from './models/turso/token.model.js';

export async function authorize() {
	const { client_secret, client_id, redirect_uris } =
		credentials.installed || credentials.web;
	const oAuth2Client = new google.auth.OAuth2(
		client_id,
		client_secret,
		redirect_uris[0]
	);

	const token = await TokenModel.loadToken();

	if (!token) {
		throw new Error('No token.json found. Autenticación requerida.');
	}

	oAuth2Client.setCredentials(token);

	try {
		const newAccessToken = await oAuth2Client.getAccessToken();

		// Si se obtuvo uno nuevo, guarda el token actualizado
		const credentials = oAuth2Client.credentials;
		if (credentials.access_token !== token.access_token) {
			await TokenModel.saveToken(JSON.stringify(credentials));
			console.log('Access token actualizado.');
		}
	} catch (err) {
		console.error('Error renovando el token:', err);
		throw new Error('No se pudo renovar el token de acceso.');
	}
	return oAuth2Client;
}
