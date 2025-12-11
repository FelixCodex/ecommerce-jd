import { CircleDashed, ShoppingCart } from 'lucide-react';
import { usePreferences } from '../hooks/usePreferences';
import { LANGUAGE } from '../consts';

export function AddButton({
	isInCart,
	loadingSubmit,
	handleAdd,
	handleNow,
}: {
	isInCart: boolean;
	loadingSubmit: boolean;
	handleAdd: () => void;
	handleNow: () => void;
}) {
	const { preferences } = usePreferences();
	return (
		<div className='flex w-full flex-col 2xl:flex-row gap-2 mt-2'>
			{loadingSubmit ? (
				<div className='w-full border border-[--light_500] text-[--light_100] rounded-lg flex items-center justify-center p-3 bg-loader relative'>
					<CircleDashed className='h-6 w-6 loader'></CircleDashed>
				</div>
			) : (
				<>
					<button
						className={`bg-[--button_cart] hover:bg-[--button_cart_hover] items-center w-full justify-center gap-2 px-5 py-3 ${
							isInCart ? 'hidden' : 'flex'
						} text-[--light_900] rounded-xl font-medium transition-colors`}
						onClick={handleAdd}
						disabled={loadingSubmit}
					>
						<ShoppingCart className='h-5 w-5' />
						{LANGUAGE.PRODUCT_BUTTON.ADD[preferences.language]}
					</button>
					<button
						className={`bg-[--button_cart_now] hover:bg-[--button_cart_now_hover] items-center w-full justify-center gap-2 px-5 py-3 ${
							isInCart ? 'hidden' : 'flex'
						} text-white rounded-xl font-medium transition-colors`}
						onClick={handleNow}
						disabled={loadingSubmit}
					>
						<ShoppingCart className='h-5 w-5' />
						{LANGUAGE.PRODUCT_BUTTON.NOW[preferences.language]}
					</button>
				</>
			)}
		</div>
	);
}
