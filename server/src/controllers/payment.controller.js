import PaymentModel from '../models/turso/payment.model.js';

class PaymentController {
	getAll = async (req, res) => {
		const payment = await PaymentModel.getAll();
		if (payment.error) return res.status(404).send({ error: payment.error });

		return res.send(payment);
	};
	getById = async (req, res) => {
		const { id } = req.body;
		const payment = await PaymentModel.getById({ id });
		if (payment.error) return res.status(404).send({ error: payment.error });

		return res.send(payment);
	};
	getByUserId = async (req, res) => {
		const auth = req.auth;

		const payment = await PaymentModel.getByUserId(auth);
		if (payment.error) return res.status(404).send({ error: payment.error });

		return res.send(payment);
	};
	getByUserIdAndId = async (req, res) => {
		const auth = req.auth;

		console.log('Get by user id and id: ', req.body);
		const payment = await PaymentModel.getByUserIdAndId({
			userId: auth.id,
			id: req.body.id,
		});
		if (payment.error) return res.status(404).send({ error: payment.error });

		return res.send(payment);
	};
}

export default PaymentController;
