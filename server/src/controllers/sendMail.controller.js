import nodemailer from 'nodemailer';

class SendMailController {
	sendMail = async (req, res) => {
		const { name, email, message } = req.body;

		if (!name || !email || !message) {
			return res
				.status(400)
				.json({ error: 'Todos los campos son obligatorios' });
		}

		try {
			// Configurar el transporte SMTP
			const transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: process.env.EMAIL_USER, // Tu correo
					pass: process.env.EMAIL_PASS, // Tu contraseña de aplicación
				},
			});

			// Configurar el correo
			const mailOptions = {
				from: email, // El correo del usuario que envía el mensaje
				to: 'javierdavidstore@gmail.com', // Tu correo donde recibirás los mensajes
				subject: `Javier David Store: Nuevo mensaje de ${name}`,
				text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
			};

			// Enviar el correo
			await transporter.sendMail(mailOptions);

			res.status(200).json({ success: 'Correo enviado correctamente' });
		} catch (error) {
			console.error('Error al enviar el correo:', error);
			res.status(500).json({ error: 'Error al enviar el correo' });
		}
	};
}

export default SendMailController;
