import { useEffect, useState } from 'react';
import { Product as ProductI } from '../types';
import { useLocation } from 'react-router-dom';
import { ProductLicenseSelector } from '../components/ProductLicenseSelector';
import { ProductGallery } from '../components/ProductGallery';
import { ProductInformationSection } from '../components/ProductInformationSection';
import { AlertTriangle } from 'lucide-react';
import { Loading } from './Loading';
import { useProduct } from '../context/products.context';

export default function Product() {
	const { products, loadingProducts } = useProduct();

	const [product, setProduct] = useState<ProductI | null | undefined>(null);
	const location = useLocation();

	useEffect(() => {
		const id = location.pathname.slice(9);
		if (!products) return;
		const prods = products.find(el => el.id == id) as ProductI;
		const prod = prods ? prods : undefined;
		setProduct(prod);
	}, [location.pathname, products]);

	return (
		<main className={`relative w-full flex justify-center items-center`}>
			<article className='bg-[--bg_prim] h-full w-full max-w-[100rem]'>
				{loadingProducts ? (
					<Loading></Loading>
				) : product ? (
					<section className='p-4 md:p-8 flex w-full gap-2'>
						<div className='w-full grid grid-dis gap-6 grid-cols-1 lg:grid-cols-[1fr,var(--aside_width)]'>
							<ProductGallery product={product}></ProductGallery>

							<ProductInformationSection
								product={product}
							></ProductInformationSection>

							<ProductLicenseSelector
								product={product}
							></ProductLicenseSelector>
						</div>
					</section>
				) : (
					<section className='w-full flex items-center p-2 justify-center anim-appear'>
						<div className='flex flex-col border border-[--light_500] mt-32 w-full md:w-fit p-12 md:p-20 lg:p-24 gap-2 md:gap-9 items-center rounded-2xl bg-[--bg_sec] justify-center'>
							<div className='flex'>
								<AlertTriangle className='w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 text-[--brand_color]'></AlertTriangle>
							</div>
							<p className='text-xl lg:text-2xl font-medium text-[--brand_color]'>
								Sorry. This product doesn't exist
							</p>
						</div>
					</section>
				)}
			</article>
		</main>
	);
}
