import { useRef, useState } from 'react';

export function ProductInputImage({
	identifier,
	name,
	placeholder,
	required,
	file,
	setFile,
}: {
	identifier: string;
	name: string;
	placeholder: string;
	required: boolean;
	file: File | null;
	setFile: (value: File | null) => void;
}) {
	const inputFile = useRef<HTMLInputElement | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0] || null;
		setFile(selectedFile);

		if (selectedFile) {
			const reader = new FileReader();
			reader.onload = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(selectedFile);
		} else {
			setImagePreview(null);
		}
	};

	const handleClick = () => {
		inputFile.current?.click();
	};

	return (
		<div className='relative w-full'>
			<label
				htmlFor={identifier}
				className='absolute top-[-14px] left-3 px-1 font-medium text-gray-600 bg-gray-50  text-lg'
			>
				{name}
			</label>
			<span
				className={`cursor-pointer flex items-center w-full h-16 text-2xl ${
					file ? 'text-gray-800' : 'text-gray-500'
				} overflow-hidden bg-gray-50 border-2 border-solid border-gray-400 hover:border-indigo-600 focus:outline-indigo-600 rounded-md p-1.5`}
				onClick={handleClick}
			>
				{file ? (
					<>
						{imagePreview && (
							<img
								src={imagePreview}
								alt='Preview'
								className='w-14 h-14 object-cover rounded-md mr-1 absolute right-0  border-2 border-gray-800'
							/>
						)}
						<span className='overflow-ellipsis max-w-full overflow-hidden'>
							{file.name}
						</span>
					</>
				) : (
					placeholder
				)}
			</span>
			<input
				ref={inputFile}
				style={{ display: 'none' }}
				type='file'
				required={required}
				name={identifier}
				id={identifier}
				accept='.png,.jpg'
				onChange={handleFileChange}
				placeholder={placeholder}
				min={0}
			/>
		</div>
	);
}
