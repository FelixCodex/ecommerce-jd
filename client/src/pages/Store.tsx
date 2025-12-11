import { LANGUAGE } from '../consts';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { usePreferences } from '../hooks/usePreferences';
import { Product } from '../types';
import { useProduct } from '../context/products.context';
import { EllipsisAnimated } from '../components/Elements/EllipsisAnimated';

export function Store() {
	const { products, loadingProducts } = useProduct();
	const { preferences } = usePreferences();
	const navigate = useNavigate();

	const handleProductClick = (productId: string) => {
		navigate(`/product/${productId}`);
		window.scrollTo({ top: 0 });
	};

	const renderProductGrid = (products: Product[]) => (
		<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8'>
			{products.map(product => (
				<ProductCard
					key={product.id}
					product={product}
					onClick={() => handleProductClick(product.id)}
				/>
			))}
		</div>
	);

	const renderLoading = () => (
		<div
			className='mt-12 flex items-end justify-center gap-2'
			role='status'
			aria-label='Loading products'
		>
			<span className='text-2xl sm:text-4xl lg:text-4xl text-[--light_0]'>
				{LANGUAGE.LOADING[preferences.language]}
			</span>
			<EllipsisAnimated className='bg-[--light_50]' />
		</div>
	);

	const renderError = () => (
		<div className='text-2xl sm:text-3xl md:text-4xl mt-12 flex items-center justify-center text-[--light_0]'>
			<p>{LANGUAGE.STORE.WRONG[preferences.language]}</p>
			<a
				className='ml-4 underline text-[--light_0]'
				href='/'
				aria-label={LANGUAGE.STORE.RELOAD[preferences.language]}
			>
				{LANGUAGE.STORE.RELOAD[preferences.language]}
			</a>
		</div>
	);

	const renderNoProducts = () => (
		<p
			className='text-2xl sm:text-3xl md:text-4xl mt-12 flex items-center justify-center text-[--light_0]'
			role='status'
			aria-label='No products available'
		>
			{LANGUAGE.STORE.NO_PRODUCTS[preferences.language]}
		</p>
	);

	const renderContent = () => {
		if (!products) {
			return loadingProducts ? renderLoading() : renderError();
		}
		return products.length > 0
			? renderProductGrid(products)
			: renderNoProducts();
	};

	return (
		<article
			id='store'
			className='min-h-screen bg-[--bg_sec] dottedBackground py-8 px-6 pt-16'
		>
			<div className='max-w-[112rem] mx-auto'>
				<header className='mb-12 text-center flex items-center justify-center'>
					<h1 className='text-4xl font-bold text-[--light_0] tracking-wide bg-[--bg_prim] w-fit py-4 border-b-2 border-[--brand_color]'>
						{LANGUAGE.STORE.TITLE[preferences.language]}
					</h1>
				</header>

				<section>{renderContent()}</section>
			</div>
		</article>
	);
}
