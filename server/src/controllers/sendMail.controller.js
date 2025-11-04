import nodemailer from 'nodemailer';
import { EMAIL_PASS, EMAIL_USER } from '../config';

class SendMailController {
	sendMail = async (req, res) => {
		const { name, email, message } = req.body;

		if (!name || !email || !message) {
			return res
				.status(400)
				.json({ error: 'Todos los campos son obligatorios' });
		}

		try {
			const transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: EMAIL_USER,
					pass: EMAIL_PASS,
				},
			});

			const mailOptions = {
				from: email,
				to: 'javierdavidstore@gmail.com',
				subject: `Javier David Store: Nuevo mensaje de ${name}`,
				text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
			};

			await transporter.sendMail(mailOptions);

			res.status(200).json({ success: 'Correo enviado correctamente' });
		} catch (error) {
			console.error('Error al enviar el correo:', error);
			res.status(500).json({ error: 'Error al enviar el correo' });
		}
	};
}

export default SendMailController;
