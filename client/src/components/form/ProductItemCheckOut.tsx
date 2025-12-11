import { LANGUAGE } from '../../consts';
import { CartProduct, Preferences } from '../../types';

export function ProductItemCheckOut({
	product,
	rate,
	preferences,
	CId,
}: {
	product: CartProduct;
	rate: number;
	preferences: Preferences;
	CId: string;
}) {
	return (
		<div
			key={'chr-' + product.id + CId}
			className='flex justify-between text-[--light_200] items-center'
		>
			<div key={'chr-0' + product.id + CId}>
				<h3 className='font-medium'>{product.title}</h3>
			</div>
			<span
				key={'chr-1' + product.id + CId}
				className='font-semibold'
			>
				{LANGUAGE.CURRENCIES[preferences.currency]}
				{(preferences.currency == 'USD'
					? product[product.license] / rate
					: product[product.license]
				).toFixed(2)}
			</span>
		</div>
	);
}
