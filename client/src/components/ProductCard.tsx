import { Product } from '../types';
import { IMG_API_URL } from '../consts';
import { Image } from 'lucide-react';
import { useState } from 'react';
import { ImageLoading } from './Elements/ImageLoading';
import { ImageUnavaliable } from './Elements/ImageUnavalilable';

export function ProductCard({
	product,
	onClick,
}: {
	product: Product;
	onClick: () => void;
}) {
	const [imageFailed, setImageFailed] = useState(false);
	return (
		<div
			onClick={onClick}
			className='group cursor-pointer relative flex flex-col rounded-xl overflow-hidden 
                 bg-[--bg_thir] shadow-[--light_500] border border-[--light_500] hover:shadow-xl 
                 transform hover:-translate-y-1 transition-all duration-300'
		>
			{/* Imagen */}
			<div className='aspect-square bg-[--light_700] overflow-hidden rounded-xl'>
				<ImageLoading loading={!imageFailed}>
					<Image className='w-36 h-36 text-[--light_600]' />
				</ImageLoading>
				<img
					src={`${IMG_API_URL}${product.image}.webp`}
					onError={e => {
						const img = e.target as HTMLImageElement;
						setImageFailed(true);
						img.onerror = null;
					}}
					alt={product.title}
					className={`w-full h-full object-cover group-hover:scale-105 transition-transform z-10 duration-500 ${
						imageFailed ? 'hidden' : 'flex'
					}`}
				/>
				<ImageUnavaliable show={imageFailed} />
			</div>

			{/* Contenido */}
			<div
				className={`p-4 absolute bottom-0 left-0 flex h-fit z-20 w-full justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity`}
			>
				<div className='p-2 px-10 w-3/4 bg-gray-200/10 border border-gray-400 backdrop-blur-md flex items-center justify-center rounded-xl'>
					<h3 className='font-semibold text-lg text-[--light_50] transition-colors'>
						{product.title}
					</h3>
				</div>
			</div>
		</div>
	);
}
