import { CartProduct, Preferences } from '../types';
import { LANGUAGE } from '../consts';

export function CartResumeItem({
	product,
	preferences,
	rate,
}: {
	product: CartProduct;
	preferences: Preferences;
	rate: number;
}) {
	const calculatePrice = () => {
		const license = product[product.license];
		return `${
			LANGUAGE.CURRENCIES[preferences.currency]
		}${(preferences.currency == 'USD' ? license / rate : license).toFixed(2)}`;
	};

	return (
		<p className='text-[--light_300] select-none hover:text-[--light_200] transition-colors font-medium flex items-center justify-between w-full'>
			<span>{product.title}</span>
			<span>{calculatePrice()}</span>
		</p>
	);
}
