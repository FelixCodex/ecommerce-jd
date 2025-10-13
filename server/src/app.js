import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import passport from './googleAuth.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import flash from 'express-flash';
import { createAuthRouter } from './routes/auth.routes.js';
import cors from 'cors';
import { createProductRouter } from './routes/product.routes.js';
import { createImgRouter } from './routes/img.routes.js';
import { createTppRouter } from './routes/tpp.routes.js';
import { createUserRouter } from './routes/user.routes.js';
import { createPaymentRouter } from './routes/payment.routes.js';
import { createPurchasedRouter } from './routes/purchased.routes.js';
import { createDataBaseRouter } from './routes/database.routes.js';
import { createChatRouter } from './routes/chat.routes.js';
import { createBeneficiaryRouter } from './routes/beneficiary.routes.js';
import { createGoogleAuthRouter } from './routes/googleAuth.routes.js';
import { CORS_CONFIG, SECRET_JWT_KEY } from './config.js';
import { createSendMailRouter } from './routes/sendMail.routes.js';
import { createQvaPayRouter } from './routes/qvapay.routes.js';
import { createCommentRouter } from './routes/comments.routes.js';
import { createDownloadRouter } from './routes/drive.routes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

app.use(cors(CORS_CONFIG));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(flash());

app.use(
	session({
		secret: SECRET_JWT_KEY,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);

app.use(passport.initialize());
app.use(passport.session());

// Incluir las rutas de autenticación
app.use('/app', createGoogleAuthRouter());

app.use(
	'/imgs',
	express.static(path.join(__dirname, '../imgs'), {
		maxAge: '1y',
		immutable: true,
	})
);
app.use('/app', createDataBaseRouter());
app.use('/app', createAuthRouter());
app.use('/app', createSendMailRouter());
app.use('/app', createProductRouter());
app.use('/app', createTppRouter());
app.use('/app', createQvaPayRouter());
app.use('/app', createUserRouter());
app.use('/app', createPaymentRouter());
app.use('/app', createCommentRouter());
app.use('/app', createPurchasedRouter());
app.use('/app', createImgRouter());
app.use('/app', createChatRouter());
app.use('/app', createBeneficiaryRouter());
app.use('/app', createDownloadRouter());

export default app;
