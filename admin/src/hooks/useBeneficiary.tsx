import { useContext } from 'react';
import { BeneficiaryContext } from '../context/beneficiarys.context';

export const useBeneficiary = () => {
	const context = useContext(BeneficiaryContext);
	if (context == undefined) {
		throw new Error('useProduct must be used within a BeneficiaryProvider');
	}
	return context;
};
