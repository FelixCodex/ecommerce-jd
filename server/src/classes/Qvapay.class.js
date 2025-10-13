import axios from 'axios';

const asd = {
	app_id: '9955dd29-082f-470b-992d-f4f0f25ea144',
	app_secret: 'ZZ03ncGDTlBFvZ0JRAq61NUkB82pwkNKs1PFkBYAAiadfbzg5l',
	amount: 99.99,
	description: 'Enanitos verdes',
	remote_id: 'MY_OWN_CUSTOM_ID',
	signed: 1,
	webhook: 'https://eo6yhuqzo7f4ha2.m.pipedream.net',
};

const resps = {
	app_id: '9955dd29-082f-470b-882d-f4f0f25ea144',
	amount: 99.99,
	description: 'Enanitos verdes',
	remote_id: 'MY_OWN_CUSTOM_ID',
	signed: 1,
	transation_uuid: '6d93a102-be6b-4379-88dc-98bd22df74ba',
	url: 'https://qvapay.com/pay/6d93a102-be6b-4379-88dc-98bd22df74ba',
	signedUrl:
		'https://qvapay.com/pay/6d93a102-be6b-4379-88dc-98bd22df74ba?expires=1649703936&signature=3eb20e5a091e4b492f4ef99dc0c781b7411e35809d034ec0493d670c4f751435',
};

export class QvaPay {
	constructor({ clientId, clientSecret }) {
		if (!clientId || !clientSecret) {
			throw new Error(
				'You must pass clientId and clientSecret in QvaPay Constructor!'
			);
		}
		this.clientId = clientId;
		this.clientSecret = clientSecret;
	}

	createPaymentLink = async ({
		amount,
		description,
		reference,
		signed,
		webhook,
	}) => {
		const dataToSend = {
			app_id: this.clientId,
			app_secret: this.clientSecret,
			amount,
			description,
			remote_id: reference,
			signed,
			webhook,
		};
		try {
			const res = await axios.post(
				'https://qvapay.com/api/v2/create_invoice',
				dataToSend
			);
			if (res.status == 200) {
				return res.data;
			} else {
				console.log(res.data);
				throw new Error('Something went wrong');
			}
		} catch (error) {
			console.log(error);
			return new Error('Something went wrong');
		}
	};
}
