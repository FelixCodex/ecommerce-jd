import { CircleDashed, CreditCard } from 'lucide-react';
import { useId } from 'react';
import { Link } from 'react-router-dom';
import { LANGUAGE } from '../consts';
import { usePreferences } from '../hooks/usePreferences';
import { CartProductItem } from '../components/CartProductItem';
import { useCart } from '../context/cart.context';
import { CartResumeItem } from '../components/CartResumeItem';
import { EllipsisAnimated } from '../components/Elements/EllipsisAnimated';

export default function Cart() {
	const { state: cart, removeFromCart, loadingCart, rate } = useCart();
	const { preferences } = usePreferences();
	const itemsCId = useId();
	const titleCId = useId();
	const checkCId = useId();
	const cartCId = useId();
	const anyCId = useId();

	const handleRemoveElement = (id: string) => {
		removeFromCart(id);
	};

	return (
		<div className='min-h-screen-minus-64 dottedBackground py-12'>
			<div className='max-w-[80rem] mx-auto px-4'>
				<div className='w-full'>
					<h1
						key={titleCId}
						className='text-4xl font-bold text-center mb-8 text-[--light_0]'
					>
						{LANGUAGE.CART.TITLE[preferences.language]}
					</h1>
					<div
						key={cartCId}
						className='flex flex-col-reverse md:flex-row items-center md:items-start gap-2'
					>
						<div
							key={itemsCId}
							className={`w-full min-w-80 bg-[--secs] rounded-lg shadow-mds px-4 flex flex-col gap-4 items-center relative`}
						>
							{loadingCart && cart.length == 0 ? (
								<p className='text-2xl font-medium text-[--light_200] gap-1 flex items-end justify-center'>
									{LANGUAGE.LOADING[preferences.language]}
									<EllipsisAnimated />
								</p>
							) : cart.length > 0 ? (
								cart.map(product => {
									return (
										<CartProductItem
											preferences={preferences}
											key={'cr-' + product.id + checkCId}
											product={product}
											rate={rate}
											handleRemoveElement={handleRemoveElement}
										></CartProductItem>
									);
								})
							) : (
								<>
									<div
										key={anyCId}
										className='flex flex-col items-center justify-center'
									>
										<p className='text-2xl font-medium flex text-[--light_200]'>
											{LANGUAGE.CART.ANY_PRODUCT[preferences.language]}
										</p>
									</div>
								</>
							)}
						</div>
						<div
							key={checkCId}
							className='w-full min-w-80 md:max-w-72 lg:max-w-sm bg-[--bg_sec] rounded-xl shadow-md p-4 flex flex-col gap-1 max-h-[18rem] md:sticky top-[5.5rem]'
						>
							{loadingCart && (
								<CircleDashed className='loader h-6 w-6 absolute right-3 top-3 text-[--light_0]'></CircleDashed>
							)}
							<p className='text-2xl font-bold text-[--light_0]'>
								{LANGUAGE.CART.SUMMARY[preferences.language]}
							</p>
							<p className='text-xl flex justify-between text-[--light_100]'>
								{LANGUAGE.CART.PRODUCT[preferences.language]}{' '}
								<span>{cart.length}</span>
							</p>
							<div className='pl-2 w-full'>
								{cart.length > 0 ? (
									cart.map(product => {
										return (
											<CartResumeItem
												key={'cr-' + product.id + checkCId}
												preferences={preferences}
												product={product}
												rate={rate}
											></CartResumeItem>
										);
									})
								) : (
									<></>
								)}
							</div>
							<p className='text-xl border-t border-[--light_400] py-2 flex justify-between items-end text-[--light_100]'>
								{LANGUAGE.CART.TOTAL[preferences.language]}{' '}
								<span className='font-bold'>
									{LANGUAGE.CURRENCIES[preferences.currency]}
									{cart
										.reduce(
											(sum = 0, item) =>
												sum +
												(preferences.currency == 'USD'
													? item[item.license] / rate
													: item[item.license]),
											0
										)
										.toFixed(2)}
								</span>
							</p>

							<Link
								to={'/checkout'}
								className='text-[--light_700] hover:text-[--brand_color] mt-2'
							>
								<button
									type='button'
									disabled={cart.length == 0}
									className={`px-4 py-2 w-full flex flex-row ${
										cart.length == 0 &&
										'cursor-not-allowed bg-[--button_not_allowed]'
									} items-center justify-center gap-2 border border-transparent text-lg font-medium rounded-md text-[--light_900] bg-[--button] hover:bg-[--button_hover] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--brand_color]`}
								>
									<CreditCard></CreditCard>{' '}
									{LANGUAGE.CART.PAY[preferences.language]}
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
