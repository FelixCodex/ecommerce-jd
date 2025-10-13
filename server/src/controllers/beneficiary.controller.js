import BeneficiaryModel from '../models/turso/beneficiary.model.js';
import crypto from 'node:crypto';
import PaymentModel from '../models/turso/payment.model.js';

class BeneficiaryController {
	getAll = async (req, res) => {
		const response = await BeneficiaryModel.getAll();
		if (response.error) return res.status(500).send(response.error);

		return res.json(response);
	};

	getById = async (req, res) => {
		const { id } = req.body;

		const response = await BeneficiaryModel.getById({ id });
		if (response.error) return res.status(500).send(response.error);

		return res.json(response);
	};

	create = async (req, res) => {
		const { name, ratingBeforeMax, ratingAfterMax, max } = req.body;

		const uuid = crypto.randomUUID();
		const uuidHex = PaymentModel.getHexUUID({ uuid });

		const response = await BeneficiaryModel.create({
			id: uuid,
			name,
			ratingBeforeMax,
			ratingAfterMax,
			max,
		});
		if (response.error) return res.status(500).send(response.error);

		return res.status(200).send({ id: uuidHex });
	};

	delete = async (req, res) => {
		const { id } = req.body;

		const response = await BeneficiaryModel.delete({
			id,
		});
		if (response.error) return res.status(500).send(response.error);

		return res.status(200).send();
	};

	pay = async (req, res) => {
		const { id } = req.body;

		const response = await BeneficiaryModel.pay({
			id,
		});
		if (response.error) return res.status(500).send(response.error);

		return res.status(200).send();
	};
}

export default BeneficiaryController;
