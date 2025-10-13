import { createContext, useEffect, useState } from 'react';
import { getPaymentsRequest } from '../api/products';
import { PaymentInterface } from '../types';
import { log_data, log_error } from '../utils';

interface PaymentContextType {
	payments: PaymentInterface[] | null;
	loadingPayments: boolean;
}

interface PaymentProviderProps {
	children: import('react').ReactElement;
}

export const PaymentContext = createContext<PaymentContextType>({
	payments: null,
	loadingPayments: true,
});

export function PaymentProvider({ children }: PaymentProviderProps) {
	const [payments, setPayments] = useState<PaymentInterface[] | null>(null);
	const [loadingPayments, setLoadingPayments] = useState(true);

	const getPayments = async () => {
		setLoadingPayments(true);
		try {
			log_data('Starting request Payments');

			const req = await getPaymentsRequest();

			log_data('Response from Payments: ', req);

			if (!req.success) throw new Error('Request failed');
			if (req.response?.status == 200) {
				setPayments(req.response.data);
			} else {
				setPayments([] as PaymentInterface[]);
			}
		} catch (error) {
			log_error('Error fetching Payments data: ', error);
		} finally {
			setLoadingPayments(false);
		}
	};

	useEffect(() => {
		getPayments();
	}, []);

	return (
		<PaymentContext.Provider value={{ payments, loadingPayments }}>
			{children}
		</PaymentContext.Provider>
	);
}
