import { Edit, TriangleAlert } from 'lucide-react';
import { IMG_API_URL } from '../consts';
import { useProduct } from '../hooks/useProduct';
import { Product, ProductInfo } from '../types';
import '../App.css';
import { useState } from 'react';
import { EditProductDialog } from '../components/EditProductDialog';

function ProductCard({
	product,
	setProductInfo,
	setIsDialogOpen,
}: {
	product: Product;
	setProductInfo: (prod: ProductInfo) => void;
	setIsDialogOpen: (bool: boolean) => void;
}) {
	const [currentImage, setCurrentImage] = useState<string>(
		`${product.image}.webp`
	);

	return (
		<div className='w-full flex flex-col group p-2 gap-3 bg-white dark:bg-gray-80 border-2 border-gray-400 dark:border-gray-5 rounded-lg shadow'>
			<div className='flex flex-col lg:flex-row gap-2'>
				<div>
					<img
						src={`${IMG_API_URL}${currentImage}`}
						alt={product.title}
						className='h-48 w-48 md:h-64 md:w-64 text-[8px] aspect-square object-cover rounded-md border-2 border-gray-400 dark:text-gray-5'
					/>
				</div>
				<div className='w-full lg:ml-4 flex flex-row justify-between gap-2'>
					<div className='flex flex-col justify-between gap-2 items-start'>
						<div className='flex items-center flex-wrap justify-between w-full'>
							<p className='w-fit text-2xl font-medium my-2 md:text-3xl flex items-start dark:text-gray-5'>
								{product.title}
							</p>
							<div className='flex items-end gap-1'>
								<button
									className='w-32 h-12 px-1 flex flex-row items-center justify-center gap-2 text-sm font-medium rounded-md text-gray-50 dark:text-gray-30 border-2 border-blue-400 dark:hover:bg-gray-70  hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'
									onClick={() => {
										setIsDialogOpen(true);
										setProductInfo({
											id: product.id,
											title: product.title,
											description: product.description,
											personal: product.personal,
											professional: product.professional,
											driveId: product.driveId,
											weight: product.weight,
										});
									}}
								>
									<Edit className='text-blue-400 h-7 w-7'></Edit>
									<span className='text-blue-400 text-xl'>Editar</span>
								</button>
								<button
									className='min-h-12 w-fit h-fit px-1 flex-row items-center justify-center gap-2 text-sm font-medium rounded-md text-gray-50 dark:text-gray-30 border-2 border-red-400 dark:hover:bg-gray-70  hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'
									style={{
										display: product.driveId
											? product.weight
												? 'none'
												: 'flex'
											: 'flex',
									}}
									onClick={() => {
										setIsDialogOpen(true);
										setProductInfo({
											id: product.id,
											title: product.title,
											description: product.description,
											personal: product.personal,
											professional: product.professional,
											driveId: product.driveId,
											weight: product.weight,
										});
									}}
								>
									<TriangleAlert className='text-red-400 h-7 w-7 min-w-7 min-h-7' />
									<span className='text-red-400 text-xl'>
										{product.driveId
											? product.weight &&
											  'El producto no tiene un peso asignado'
											: 'El producto no tiene un archivo asignado!'}
									</span>
								</button>
							</div>
						</div>
						<p className='w-full text-lg md:text-2xl p-2 px-3 rounded-xl bg-gray-100 border-2 border-gray-300 flex text-start items-start dark:text-gray-5'>
							{product.description}
						</p>
						<p className='text-2xl flex items-center dark:text-gray-5 p-1 px-2 rounded-xl bg-gray-100 border-2 border-gray-300'>
							From ${product.personal} to ${product.professional}
						</p>
					</div>
				</div>
			</div>
			<div className='flex gap-1'>
				<div>
					<img
						src={`${IMG_API_URL}${product.image}.webp`}
						alt={product.title}
						onMouseEnter={() => setCurrentImage(`${product.image}.webp`)}
						className={`${
							currentImage == `${product.image}`
								? 'border-amber-200'
								: 'border-gray-400'
						} h-[4.375rem] w-[4.375rem] text-[8px] aspect-square object-cover rounded-md border-2 border-gray-400 dark:text-gray-5`}
					/>
				</div>
				{product.gallery?.map(image => {
					return (
						<div>
							<img
								src={`${IMG_API_URL}${image}.webp`}
								alt={product.title}
								onMouseEnter={() => setCurrentImage(`${image}.webp`)}
								className={`${
									currentImage == `${image}`
										? 'border-amber-300'
										: 'border-gray-400'
								} h-[4.375rem] w-[4.375rem] text-[8px] aspect-square object-cover rounded-md border-2 dark:text-gray-5`}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export function Products() {
	const { products, loadingProducts, updateProduct } = useProduct();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [currentId, setCurrentId] = useState('');
	const [currentTitle, setCurrentTitle] = useState('');
	const [currentDesc, setCurrentDesc] = useState('');
	const [currentPersonal, setCurrentPersonal] = useState(0);
	const [currentProfessional, setCurrentProfessional] = useState(0);
	const [currentDriveId, setcurrentDriveId] = useState('');
	const [currentWeight, setCurrentWeight] = useState(0);

	const setProductInfo = ({
		id,
		title,
		description,
		personal,
		professional,
		driveId,
		weight,
	}: ProductInfo) => {
		setCurrentId(id);
		setCurrentTitle(title);
		setCurrentDesc(description);
		setCurrentPersonal(personal);
		setCurrentProfessional(professional);
		setcurrentDriveId(driveId);
		setCurrentWeight(weight);
	};

	return (
		<div className='w-full min-h-lvh flex justify-center overflow-hidden'>
			<div className='w-full min-h-lvh p-3 lg:p-10 pt-14 max-h-[calc(100vh-96px)] overflow-auto flex flex-col items-center gap-4'>
				{loadingProducts ? (
					<span className='text-2xl'>Cargando productos...</span>
				) : products && products.length != 0 ? (
					<>
						{products.map(prod => {
							return (
								<ProductCard
									product={prod}
									setIsDialogOpen={setIsDialogOpen}
									setProductInfo={setProductInfo}
								></ProductCard>
							);
						})}
					</>
				) : (
					<span className='text-2xl'>No se encontraron productos</span>
				)}
			</div>
			<EditProductDialog
				productInfo={{
					id: currentId,
					title: currentTitle,
					description: currentDesc,
					personal: currentPersonal,
					professional: currentProfessional,
					driveId: currentDriveId,
					weight: currentWeight,
				}}
				isOpen={isDialogOpen}
				setIsOpen={setIsDialogOpen}
				updateProduct={updateProduct}
			></EditProductDialog>
		</div>
	);
}
