import { useRef, useState } from 'react';

export function ProductInputGallery({
	identifier,
	name,
	placeholder,
	required,
	files,
	setFiles,
}: {
	identifier: string;
	name: string;
	placeholder: string;
	required: boolean;
	files: File[] | null;
	setFiles: (value: File[] | null) => void;
}) {
	const [previews, setPreviews] = useState<string[]>([]);
	const inputFile = useRef<HTMLInputElement | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = event.target.files
			? Array.from(event.target.files)
			: [];
		setFiles(selectedFiles);

		const newPreviews: string[] = [];
		selectedFiles.forEach(file => {
			const reader = new FileReader();
			reader.onload = () => {
				newPreviews.push(reader.result as string);
				if (newPreviews.length === selectedFiles.length) {
					setPreviews(newPreviews);
				}
			};
			reader.readAsDataURL(file);
		});
	};

	const handleClick = () => {
		inputFile.current?.click();
	};

	return (
		<div className='relative w-full'>
			<label
				htmlFor={identifier}
				className='absolute top-[-14px] left-3 px-1 bg-gray-50 font-medium text-gray-600 text-lg'
			>
				{name}
			</label>
			<span
				className={`cursor-pointer flex items-center w-full h-16 text-2xl ${
					files ? 'text-gray-800' : 'text-gray-500'
				} overflow-hidden bg-gray-50 border-2 border-solid border-gray-400 hover:border-indigo-600 focus:outline-indigo-600 rounded-md p-1.5`}
				onClick={handleClick}
			>
				{files ? `${files.length} archivos seleccionados` : placeholder}
			</span>
			<input
				ref={inputFile}
				style={{ display: 'none' }}
				type='file'
				name={identifier}
				multiple={true}
				id={identifier}
				required={required}
				accept='.jpg, .png'
				onChange={handleFileChange}
				placeholder={placeholder}
				min={0}
			/>
			<div className='w-full flex flex-row flex-wrap max-w-3xl gap-2 mt-2'>
				{files && files.length > 0 ? (
					previews.map((preview, index) => (
						<img
							key={index}
							src={preview}
							alt={`Preview ${index + 1}`}
							className='w-14 h-14 object-cover rounded-md border-2 border-gray-800'
						/>
					))
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
