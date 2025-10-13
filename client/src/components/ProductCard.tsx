import { Product } from '../types';
import { IMG_API_URL, LANGUAGE } from '../consts';
import { useCart } from '../context/cart.context';
import { usePreferences } from '../hooks/usePreferences';

export function ProductCard({
	product,
	onClick,
}: {
	product: Product;
	onClick: () => void;
}) {
	const { rate } = useCart();
	const { preferences } = usePreferences();

	return (
		<div
			onClick={onClick}
			className='group cursor-pointer flex flex-col rounded-xl overflow-hidden 
                 bg-[--bg_thir] shadow-[--light_500] hover:shadow-xl 
                 transform hover:-translate-y-1 transition-all duration-300'
		>
			{/* Imagen */}
			<div className='aspect-video bg-[--light_700]'>
				<img
					src={`${IMG_API_URL}${product.image}.webp`}
					alt={product.title}
					className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
				/>
			</div>

			{/* Contenido */}
			<div className='p-4 flex h-full justify-between items-center'>
				<h3 className='font-semibold text-lg text-[--light_0] group-hover:text-[--brand_color] transition-colors'>
					{product.title}
				</h3>
				<div className='text-right font-bold text-[--brand_color]'>
					{product.isFree ? (
						<span>{LANGUAGE.PRODUCT_BUTTON.FREE[preferences.language]}</span>
					) : (
						<>
							<span className='block text-sm text-[--light_200]'>
								{LANGUAGE.PRODUCT_BUTTON.FROM[preferences.language]}
							</span>
							<span className='text-lg'>
								{LANGUAGE.CURRENCIES[preferences.currency]}
								{(preferences.currency === 'USD'
									? product.personal / rate
									: product.personal
								).toFixed(2)}
							</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
