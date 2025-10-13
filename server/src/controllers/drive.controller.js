import PurchasedModel from '../models/turso/purchased.model.js';
import ProductModel from '../models/turso/product.model.js';
import UserModel from '../models/turso/user.model.js';
import { google } from 'googleapis';
import { authorize } from './../driveAuth.js';
import credentials from '../../credentials.json' with { type: 'json' };
import TokenModel from '../models/turso/token.model.js';

const AUTH_COMPLETE_HTML = `<main
    style="width: 100%;
height: 100vh;
background-color: #f9fafb;
display: flex;
justify-content: center;
align-items: center;"
  >
    <section
      style="
width: 22rem;
height: 14rem;
background-color: #fff;
box-shadow: 0 0 0.875rem #d1d5dc ;
border-radius: 2rem;
display: flex;
gap: 1rem;
flex-direction: column;
justify-content: center;
align-items: center;"
    >
      <p
        style="
text-align: center;
font-size: 1.2rem;
font-weight: 700;
color: #111827;"
      >
        Autenticacion completada
      </p>
      <a
        href="https://h6g-adm-j.pages.dev"
        style="
text-align: center;
font-size: 1.2rem;
font-weight: 700;
color: #f1f1f1;"
      >
        <button
          style="width: fit-content;
height: fit-content;
padding: 0.75rem;
background-color: #4b67e4;
border-radius: 1rem;"
        >
          Volver al admin
        </button>
      </a>
    </section>
  </main>`;

class DriveController {
	downloadFile = async (req, res) => {
		try {
			const auth = req.auth;

			const userFound = await UserModel.getById(auth);
			if (!userFound)
				return res.status(404).send({ error: ['User not found'] });
			console.log('User found');

			const productId = req.params.id;

			const product = await ProductModel.getById({ id: productId });
			if (!product)
				return res.status(404).send({ error: ['Product not found'] });
			console.log('Product found');

			const purchased = await PurchasedModel.getByUserIdAndProductId({
				userId: auth.id,
				id: productId,
			});
			if (!purchased)
				return res.status(404).send({ error: ['Product is not purchased'] });
			console.log('Purchase found');

			const FILE_ID = product.driveId;
			const FILE_NAME = `${product.title}.zip`;

			const authClient = await authorize();

			const drive = google.drive({ version: 'v3', auth: authClient });

			const file = await new Promise((resolve, reject) => {
				drive.files.get(
					{ fileId: FILE_ID, alt: 'media' },
					{ responseType: 'stream' },
					(err, res) => {
						if (err) {
							return reject(err);
						}
						resolve(res);
					}
				);
			});

			const fileMetadata = await new Promise((resolve, reject) => {
				drive.files.get(
					{
						fileId: FILE_ID,
						fields: 'size',
					},
					(err, res) => {
						if (err) {
							return reject(err);
						}
						resolve(res);
					}
				);
			});
			const fileSize = fileMetadata.data.size;

			res.setHeader('Content-Type', 'application/zip');
			res.setHeader(
				'Content-Disposition',
				`attachment; filename="${FILE_NAME}"`
			);
			res.setHeader('Content-Length', fileSize);

			file.data.pipe(res);
		} catch (err) {
			console.error('Error descargando archivo:', err);
			res.status(500).send({ error: 'Error descargando archivo' });
		}
	};

	authRedirect = async (req, res) => {
		const { client_secret, client_id, redirect_uris } =
			credentials.installed || credentials.web;
		const oAuth2Client = new google.auth.OAuth2(
			client_id,
			client_secret,
			redirect_uris[0]
		);
		const authUrl = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: ['https://www.googleapis.com/auth/drive.readonly'],
			prompt: 'consent',
		});
		res.redirect(authUrl);
	};

	oAuth2Callback = async (req, res) => {
		const code = req.query.code;

		const { client_id, client_secret, redirect_uris } =
			credentials.installed || credentials.web;
		const oAuth2Client = new google.auth.OAuth2(
			client_id,
			client_secret,
			redirect_uris[0]
		);

		try {
			const { tokens } = await oAuth2Client.getToken(code);
			console.log('Drive controller Tokens: ', tokens);
			oAuth2Client.setCredentials(tokens);

			if (tokens.refresh_token) {
				await TokenModel.saveToken(JSON.stringify(tokens));
				console.log('Refresh token guardado correctamente');
			} else {
				console.log('No se recibió refresh_token. No se guardó el token.');
			}

			res.send(AUTH_COMPLETE_HTML);
		} catch (err) {
			console.error('Error obteniendo el token', err);
			res.status(500).send('Error autenticando.');
		}
	};
}

export default DriveController;
