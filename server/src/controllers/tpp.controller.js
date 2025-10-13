import { ServerSideUtils } from '@yosle/tropipayjs';
import PaymentModel from '../models/turso/payment.model.js';
import TppModel from '../models/turso/tpp.model.js';
import UserModel from '../models/turso/user.model.js';
import { TPP_CLIENT_ID, TPP_CLIENT_SECRET } from '../config.js';
import { filterADifferenceBFromCart } from '../libs/utils.js';
import PurchasedModel from '../models/turso/purchased.model.js';
import ProductModel from '../models/turso/product.model.js';
import crypto from 'node:crypto';
import BeneficiaryModel from '../models/turso/beneficiary.model.js';

async function payBeneficiarys({ price }) {
	const beneficiarys = await BeneficiaryModel.getAll();
	console.log('Beneficiarys: ', beneficiarys);
	let percentAccum = 0;
	const percentAcceptedBenefs = beneficiarys.filter(b => {
		if (b.paid > b.max) {
			if (percentAccum + b.ratingAfterMax > 100) return false;
			percentAccum += b.ratingAfterMax;
			return true;
		} else {
			if (percentAccum + b.ratingBeforeMax > 100) return false;
			percentAccum += b.ratingBeforeMax;
			return true;
		}
	});
	console.log('Percent Accepted Beneficiarys: ', percentAcceptedBenefs);

	percentAcceptedBenefs.forEach(async b => {
		if (b.paid > b.max) {
			const percentedPrice = price * (b.ratingAfterMax / 100);
			console.log('Percented Price: ', percentedPrice);
			const accum = b.accumulation + Math.floor(percentedPrice);
			await BeneficiaryModel.addAccum({ id: b.id, accum });
		} else {
			const percentedPrice = price * (b.ratingBeforeMax / 100);
			console.log('Percented Price: ', percentedPrice);
			const accum = b.accumulation + Math.floor(percentedPrice);
			await BeneficiaryModel.addAccum({ id: b.id, accum });
		}
	});
}

class TppController {
	getNotification = async (req, res) => {
		const { status, data } = req.body;
		const isVerifiedPayload = ServerSideUtils.verifySignature(
			{
				clientId: TPP_CLIENT_ID,
				clientSecret: TPP_CLIENT_SECRET,
			},
			data.originalCurrencyAmount,
			data.bankOrderCode,
			data.signaturev2
		);

		if (!isVerifiedPayload) {
			// maybe use a logger like winston
			console.error('Invalid signature');

			// if you provide
			return res.status(400).json({
				message: 'Invalid signature',
			});
		}

		try {
			if (status == 'OK') {
				const uuid = data.paymentcard.reference;

				console.log('UUID: ' + uuid);

				const payment = await PaymentModel.getById({ id: uuid });
				if (!payment) return;

				await payBeneficiarys({ price: payment.price });

				console.log('Payments: ', payment);
				console.log('Payment userId: ', payment.userId);

				const purchased = await PurchasedModel.getByUserId({
					id: payment.userId,
				});
				if (purchased.error) return;

				console.log('Purchased: ', purchased);

				const difference = filterADifferenceBFromCart(payment.cart, purchased);

				console.log('Difference: ', difference);

				await PurchasedModel.createMultiple({
					array: difference,
					userId: payment.userId,
				});

				await UserModel.clearCart({ id: payment.userId });

				await PaymentModel.setCompletedById({
					uuid,
					order: data.bankOrderCode,
					bookingDate: data.bookingDate,
				});
			} else {
				const uuid = data.data.paymentcard.reference;

				const payment = await PaymentModel.getById({ id: uuid });
				if (!payment) return;

				await PaymentModel.setFailedById({
					uuid,
					order: data.bankOrderCode,
					bookingDate: data.bookingDate,
				});
			}
		} catch (err) {
			console.log(err);
		} finally {
			return res.status(200).send('Webhook received successfully');
		}
	};
	create = async (req, res) => {
		const auth = req.auth;

		const userFound = await UserModel.getByIdWithCart(auth);
		if (!userFound) return res.status(404).send({ error: ['User not found'] });

		const total = JSON.parse(userFound.cart).reduce(
			(sum, item) => (sum += item[item.license]),
			0
		);

		const price = Math.floor(total * 100);
		const { name, lastName, phoneNumber, address, country, city, postalCode } =
			req.body;
		const email = userFound.email;

		const uuid = crypto.randomUUID();

		const uuidHex = await PaymentModel.getHexUUID({ uuid });

		const reference = `${uuidHex}`;

		console.log({
			reference,
			price,
		});

		const link = await TppModel.createPaymentCard({
			reference,
			price,
			name,
			lastName,
			address,
			phone: phoneNumber,
			email,
			countryId: country,
			city,
			postCode: postalCode,
		});

		if (!link) return res.status(500).send({ error: 'Null link returned' });
		console.log('link: ', link);

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
	createSingleProduct = async (req, res) => {
		const auth = req.auth;

		const userFound = await UserModel.getByIdWithCart(auth);
		if (!userFound) return res.status(404).send({ error: ['User not found'] });

		const {
			name,
			lastName,
			phoneNumber,
			address,
			country,
			city,
			postalCode,
			productId,
			license,
		} = req.body;

		if (
			!productId ||
			!license ||
			(license != 'personal' && license != 'professional')
		)
			return res
				.status(404)
				.send({ error: ['Product id or license not provided'] });

		const product = await ProductModel.getById({ id: productId });
		if (!product) return res.status(404).send({ error: ['Product not found'] });

		const purchased = await PurchasedModel.getByUserIdAndId({
			userId: auth.id,
			id: productId,
		});
		if (purchased)
			return res.status(403).send({ error: ['Product already purchased'] });

		const total = product[license];
		const price = Math.floor(total * 100);

		const email = userFound.email;

		const uuid = crypto.randomUUID();

		const uuidHex = await PaymentModel.getHexUUID({ uuid });

		const reference = `${uuidHex}`;

		console.log({
			reference,
			price,
		});

		const link = await TppModel.createPaymentCard({
			reference,
			price,
			name,
			lastName,
			address,
			phone: phoneNumber,
			email,
			countryId: country,
			city,
			postCode: postalCode,
		});

		if (!link) return res.status(500).send({ error: 'Null link returned' });
		console.log('link: ', link);

		const payment = await PaymentModel.create({
			uuid: uuid,
			cart: `[{
          "id": "${product.id}",
          "title": "${product.title}",
          "personal": ${product.personal},
          "professional": ${product.professional},
          "license": "${license}",
          "image": "${product.image}"
      }]`,
			shortURL: link,
			userId: auth.id,
			price: total,
		});
		if (payment.error) return res.status(406).send({ error: payment.error });

		console.log(payment);

		res.send({ paymentlink: link });
	};
}

export default TppController;
