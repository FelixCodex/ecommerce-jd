import { useState } from 'react';
import { ProductInput } from '../components/ProductInputs/ProductInput.tsx';
import { ProductInputGallery } from '../components/ProductInputs/ProductInputGallery.tsx';
import { ProductInputImage } from '../components/ProductInputs/ProductInputImage.tsx';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { createProductRequest } from '../api/products.ts';
import { Toggle } from '../components/Toggle.jsx';

type ProdInfo = {
	title: string | null;
	description: string | null;
	personal: number | null;
	professional: number | null;
	image: File | null;
	gallery: File[] | null;
	driveUrl: string | null;
	weight: number | null;
	isFree: boolean;
};

const initialState = {
	title: '',
	description: '',
	personal: null,
	professional: null,
	image: null,
	gallery: null,
	driveUrl: '',
	weight: null,
	isFree: false,
};

export function ProductAdder() {
	const [errors, setErrors] = useState<string[] | null>(null);

	const [data, setData] = useState<ProdInfo>(initialState);
	const [progress, setProgress] = useState<number>(0);
	const [speed, setSpeed] = useState<number>(0);
	const [time, setTime] = useState<number>(0);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formDataToSend = new FormData();

		formDataToSend.append('title', data.title as string);
		formDataToSend.append('description', data.description as string);
		formDataToSend.append('personal', data.isFree ? '0' : data.personal + '');
		formDataToSend.append(
			'professional',
			'' + (data.isFree ? 0 : data.professional)
		);
		formDataToSend.append('image', data.image as File);
		formDataToSend.append('driveUrl', data.driveUrl as string);
		formDataToSend.append('weight', data.weight + '');
		formDataToSend.append('isFree', data.isFree + '');

		const gallery = data.gallery as File[];

		gallery.forEach(item => {
			formDataToSend.append('gallery', item);
		});

		const toastId = toast.loading('Producto enviado a guardar');

		try {
			const req = await createProductRequest(
				formDataToSend,
				setProgress,
				setSpeed,
				setTime
			);

			setData(initialState);

			if (req.success && req.response?.status == 200) {
				toast.success('Producto guardado', { id: toastId });
			} else {
				toast.error('Ocurrio un error', { id: toastId });
			}
		} catch (error) {
			console.log(error);
			toast.error('Ocurrio un error', { id: toastId });
		} finally {
			setProgress(0);
		}
	};

	const updateData = (
		field: string,
		value: string | number | File | null | File[] | boolean
	) => {
		setData(prev => ({ ...prev, [field]: value }));
	};

	const estimatedTime = `${Math.floor(
		time > 60 ? (time > 3600 ? time / 3600 : time / 60) : time
	)}${time > 60 ? (time > 3600 ? 'h' : 'm') : 's'}`;

	const velocity = `${Math.floor(
		speed > 1000 ? (speed > 1000000 ? speed / 1000000 : speed / 1000) : speed
	)}/${speed > 1000 ? (speed > 1000000 ? 'Mb' : 'Kb') : 'B'}`;

	return (
		<>
			<div className='w-full flex flex-col items-center p-3'>
				{errors ? (
					<div className='relative w-3xl bg-red-400 flex flex-col p-4 rounded-lg mt-4 items-start gap-1  outline-none ring-2 ring-offset-2 ring-red-400'>
						<X
							className='absolute right-2 top-2'
							onClick={() => {
								setErrors(null);
							}}
						></X>
						{errors.map((item, index) => {
							return (
								<span
									key={index * 100}
									className='text-2xl'
								>
									{item}
								</span>
							);
						})}
					</div>
				) : (
					<></>
				)}
				<form
					action=''
					className='flex flex-col gap-4 mt-8 pt-5 max-w-3xl w-full overflow-hidden'
					onSubmit={handleSubmit}
				>
					<ProductInput
						value={data.title as string}
						setValue={(value: string | number) => {
							updateData('title', value);
						}}
						required
						name='Titulo'
						identifier='title'
						type='text'
						placeholder='Titulo del producto'
					/>
					<ProductInput
						value={data.description as string}
						setValue={(value: string | number) => {
							updateData('description', value);
						}}
						required
						name='Descripción'
						identifier='description'
						type='textarea'
						placeholder='Descripcion del producto'
					></ProductInput>
					<Toggle
						checked={data.isFree}
						label='Producto es Gratis?'
						onChange={(value: boolean) => {
							updateData('isFree', value);
						}}
					></Toggle>
					<ProductInput
						value={data.isFree ? 0 : (data.personal as number)}
						setValue={(value: string | number) => {
							updateData('personal', value);
						}}
						required
						name='Personal'
						identifier='personal'
						type='number'
						step='0.01'
						disabled={data.isFree}
						placeholder='Precio personal'
					></ProductInput>
					<ProductInput
						value={data.isFree ? 0 : (data.professional as number)}
						setValue={(value: string | number) => {
							updateData('professional', value);
						}}
						required
						name='Professional'
						identifier='professional'
						type='number'
						step='0.01'
						disabled={data.isFree}
						placeholder='Precio Profesional'
					></ProductInput>
					<ProductInputImage
						required
						file={data.image}
						setFile={(value: File | null) => {
							updateData('image', value);
						}}
						name='Imagen Principal'
						identifier='image'
						placeholder='Imagen principal del producto'
					></ProductInputImage>
					<ProductInputGallery
						required
						files={data.gallery}
						setFiles={(value: File[] | null) => {
							updateData('gallery', value);
						}}
						name='Galeria'
						identifier='gallery'
						placeholder='Selecciona las imagenes de galeria del producto'
					></ProductInputGallery>
					<ProductInput
						value={data.driveUrl as string}
						setValue={(value: string | number) => {
							updateData('driveUrl', value);
						}}
						required
						name='Drive Url'
						identifier='driveUrl'
						type='text'
						placeholder='Link del archivo'
					></ProductInput>
					<ProductInput
						value={data.weight as number}
						setValue={(value: string | number) => {
							updateData('weight', value);
						}}
						required
						name='Weight (en MB)'
						identifier='weight'
						type='number'
						step='0.01'
						placeholder='Peso del archivo'
					></ProductInput>
					{progress > 0 ? (
						<div>
							<div className='w-full h-10 rounded-md bg-gray-300'>
								<div
									className='h-full rounded-md flex transition-[width] items-center justify-end pr-2 bg-indigo-500'
									style={{ width: `${progress}%` }}
								>
									<span className='text-xl font-medium text-gray-100'>
										{progress}%
									</span>
								</div>
							</div>
							<p className='mt-2 '>
								<span className='text-xl font-medium pr-2 mr-2 border-r-2 border-gray-800'>
									Speed: {velocity}
								</span>
								<span className='text-xl font-medium'>
									Estimated time: {estimatedTime}
								</span>
							</p>
						</div>
					) : (
						<button
							type='submit'
							className='px-4 py-2 w-44 h-14 flex flex-row items-center justify-center gap-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							Guardar
						</button>
					)}
				</form>
			</div>
		</>
	);
}

{
	/* <ProductInputRar
            required
            loadingFile={loadingFile}
            setLoadingFile={setLoadingFile}
            file={rar}
            setFile={setRar}
            name="Archivo Rar"
            identifier="rar"
            placeholder="Archivo rar del producto"
          ></ProductInputRar> */
}
