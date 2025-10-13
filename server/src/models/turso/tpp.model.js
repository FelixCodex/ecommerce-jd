import { Tropipay } from '@yosle/tropipayjs';
import {
	CLIENT_URL,
	SERVER_URL,
	TPP_CLIENT_ID,
	TPP_CLIENT_SECRET,
} from '../../config.js';

const config = {
	clientId: TPP_CLIENT_ID,
	clientSecret: TPP_CLIENT_SECRET,
	scopes: [
		'ALLOW_GET_PROFILE_DATA',
		'ALLOW_PAYMENT_IN',
		'ALLOW_EXTERNAL_CHARGE',
	],
	serverMode: 'Production',
};

const tpp = new Tropipay(config);
console.log('>> TROPIPAY CONNECTED');

export class TppModel {
	static async createPaymentCard({
		reference,
		price,
		name,
		lastName,
		address,
		phone,
		email,
		countryId,
		city,
		postCode,
	}) {
		const payload = {
			reference: reference,
			concept: 'Bicycle',
			favorite: 'true',
			amount: price,
			currency: 'EUR',
			description: 'Two wheels',
			singleUse: 'true',
			reasonId: 4,
			expirationDays: 1,
			lang: 'es',
			urlSuccess: CLIENT_URL + 'payment/success',
			urlFailed: CLIENT_URL + 'payment/failed',
			urlNotification: SERVER_URL + 'app/tpp/notify',
			serviceDate: '2021-08-20',
			client: {
				name: name,
				lastName: lastName,
				address: address,
				phone: phone,
				email: email,
				countryId: countryId,
				termsAndConditions: 'true',
				city: city,
				postCode: postCode,
			},
			directPayment: 'true',
		};
		try {
			const paylink = await tpp.paymentCards.create(payload);
			console.log(paylink.shortUrl);
			return paylink.shortUrl;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	static async getRate() {
		try {
			const rate = await tpp.rates('USD', 'EUR');
			return rate;
		} catch (error) {
			return 1;
		}
	}
}

export default TppModel;

// export class TppModel {
//   static async createPaymentCard({
//     reference,
//     price,
//     name,
//     lastName,
//     address,
//     phone,
//     email,
//     countryId,
//     city,
//     postCode,
//   }) {
//     const payload = {
//       reference: reference,
//       concept: "Bicycle",
//       favorite: "true",
//       amount: price,
//       currency: "EUR",
//       description: "Two wheels",
//       singleUse: "true",
//       reasonId: 4,
//       expirationDays: 1,
//       lang: "es",
//       urlSuccess: "https://vs0wwjrk-3000.use2.devtunnels.ms/app/tpp",
//       urlFailed: "https://vs0wwjrk-3000.use2.devtunnels.ms/app/tpp",
//       urlNotification: "https://vs0wwjrk-3000.use2.devtunnels.ms/app/tpp",
//       serviceDate: "2021-08-20",
//       client: {
//         name: name,
//         lastName: lastName,
//         address: address,
//         phone: phone,
//         email: email,
//         countryId: countryId,
//         termsAndConditions: "true",
//         city: city,
//         postCode: postCode,
//       },
//       directPayment: "true",
//     };
//     // Use inside an async function
//     const paylink = await tpp.paymentCards.create(payload);
//     console.log(paylink.shortUrl);
//     return paylink;
//   }
// }
