import { QvaPay } from '../../classes/Qvapay.class.js';
import { QVAPAY_CLIENT_ID, QVAPAY_CLIENT_SECRET } from '../../config.js';

const config = {
	clientId: QVAPAY_CLIENT_ID,
	clientSecret: QVAPAY_CLIENT_SECRET,
};

const qvapay = new QvaPay(config);

console.log('>> QVAPAY CONNECTED');

export class QvaPayModel {
	static async createPaymentLink({ reference, price, description, signed }) {
		const payload = {
			reference,
			description,
			amount: price,
			signed,
			webhook: 'https://3dcute.up.railway.app/app/qvapay/notify',
		};
		try {
			const paylink = await qvapay.createPaymentLink(payload);
			console.log('returned value of createPaymentInvoice: ', paylink);
			return paylink.signedUrl;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}

export default QvaPayModel;
