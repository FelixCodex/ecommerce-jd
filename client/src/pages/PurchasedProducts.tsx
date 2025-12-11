import { EllipsisAnimated } from '../components/Elements/EllipsisAnimated';
import { PurchasedProductCard } from '../components/PurchasedProductCard';
import { LANGUAGE } from '../consts';
import { useCart } from '../context/cart.context';
import { usePreferences } from '../hooks/usePreferences';

export default function PurchasedProducts() {
	const { purchased, loadingPurchased } = useCart();
	const { preferences } = usePreferences();

	return (
		<article className='lg:col-span-1'>
			<section className='bg-[--bg_sec] rounded-xl shadow-md p-6'>
				<h2 className='text-2xl font-bold mb-6 text-[--light_0]'>
					{LANGUAGE.DASHBOARD.PURCHASED[preferences.language]}
				</h2>
				{loadingPurchased ? (
					<p className='text-xl flex items-end gap-1 mb-3 text-[--light_200] justify-center'>
						{LANGUAGE.LOADING[preferences.language]}
						<EllipsisAnimated />
					</p>
				) : purchased.length == 0 ? (
					<p className='text-xl flex mb-3 text-[--light_200] justify-center'>
						{LANGUAGE.DASHBOARD.ANYITEMS[preferences.language]}
					</p>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{purchased.map(product => (
							<PurchasedProductCard
								key={product.id}
								product={product}
								preferences={preferences}
							/>
						))}
					</div>
				)}
			</section>
		</article>
	);
}
