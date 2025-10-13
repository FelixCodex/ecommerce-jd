import QvaPayModel from '../models/turso/qvapay.model.js';
import UserModel from '../models/turso/user.model.js';
import PaymentModel from '../models/turso/payment.model.js';
import crypto from 'node:crypto';

class QvaPayController {
	getNotification = req => {
		console.log('Notify recieve in post endpoint');
		console.log('Request body: ', req);
	};

	create = async (req, res) => {
		const auth = req.auth;

		const userFound = await UserModel.getByIdWithCart(auth);
		if (!userFound) return res.status(404).send({ error: ['User not found'] });

		const total = JSON.parse(userFound.cart).reduce(
			(sum, item) => (sum += item.price),
			0
		);

		const price = total;

		const description = 'Invoice';

		const uuid = crypto.randomUUID();
		const uuidHex = await PaymentModel.getHexUUID({ uuid });

		const reference = `${uuidHex}`;

		console.log({
			reference,
			price,
			description,
			signed: 1,
		});

		const link = await QvaPayModel.createPaymentLink({
			reference,
			price,
			description,
			signed: 1,
		});

		const payment = await PaymentModel.create({
			uuid: uuid,
			cart: userFound.cart,
			shortURL: link,
			userId: auth.id,
			price: total,
		});
		if (payment.error) return res.status(406).send({ error: payment.error });

		console.log(payment);

		res.send({ paymentlink: link });
	};
}

export default QvaPayController;
