import { createContext, useEffect, useState } from 'react';
import { getPurchasesRequest } from '../api/products';
import { PurchasesInterface } from '../types';
import { log_data, log_error } from '../utils';

interface PurchasesContextType {
	purchases: PurchasesInterface[] | null;
	loadingPurchases: boolean;
}

interface PurchasesProviderProps {
	children: import('react').ReactElement;
}

export const PurchasesContext = createContext<PurchasesContextType>({
	purchases: null,
	loadingPurchases: true,
});

export function PurchasesProvider({ children }: PurchasesProviderProps) {
	const [purchases, setPurchases] = useState<PurchasesInterface[] | null>(null);
	const [loadingPurchases, setLoadingPurchases] = useState(true);

	const getPurchasess = async () => {
		setLoadingPurchases(true);
		try {
			log_data('Starting request Purchasess');

			const req = await getPurchasesRequest();

			log_data('Response from Purchasess: ', req);

			if (!req.success) throw new Error('Request failed');
			if (req.response?.status == 200) {
				setPurchases(req.response.data);
			} else {
				setPurchases([] as PurchasesInterface[]);
			}
		} catch (error) {
			log_error('Error fetching Purchasess data: ', error);
		} finally {
			setLoadingPurchases(false);
		}
	};

	useEffect(() => {
		getPurchasess();
	}, []);

	return (
		<PurchasesContext.Provider value={{ purchases, loadingPurchases }}>
			{children}
		</PurchasesContext.Provider>
	);
}
