import { useContext } from 'react';
import { PaymentContext } from '../context/payments.context';

export const usePayment = () => {
	const context = useContext(PaymentContext);
	if (context == undefined) {
		throw new Error('useProduct must be used within a PaymentProvider');
	}
	return context;
};
