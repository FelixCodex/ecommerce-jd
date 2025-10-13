import PurchasedModel from '../models/turso/purchased.model.js';

class PurchasedController {
	getAll = async (req, res) => {
		const purchases = await PurchasedModel.getAll();
		if (!purchases) return res.status(500).send(purchases.error);

		res.send(purchases);
	};

	getById = async (req, res) => {
		const { id } = req.body;

		const purcahsed = await PurchasedModel.getById({ id });
		if (!purcahsed) return res.status(500).send(purcahsed.error);

		res.send(response);
	};

	getByUserId = async (req, res) => {
		const auth = req.auth;

		const response = await PurchasedModel.getByUserIdRestricted(auth);

		res.send(response);
	};
}

export default PurchasedController;
