export function ProductInput<T>({
	value,
	setValue,
	identifier,
	name,
	type,
	required,
	placeholder,
	step,
	disabled,
}: {
	value: T;
	setValue: (value: T) => void;
	identifier: string;
	name: string;
	type: string;
	required: boolean;
	placeholder: string;
	step?: string;
	disabled?: boolean;
}) {
	return (
		<div className='relative w-full'>
			<label
				htmlFor={identifier}
				className={`absolute top-[-0.875rem] left-3 px-1 ${
					disabled ? 'hidden' : 'from-gray-50 to-white bg-gradient-to-b'
				} text-lg rounded-md font-medium text-gray-600`}
			>
				{name}
			</label>
			{type == 'textarea' ? (
				<textarea
					value={value as string}
					onChange={e => setValue(e.target.value as T)}
					name={identifier}
					id={identifier}
					required={required}
					disabled={disabled}
					className='w-full h-28 text-2xl text-gray-900 placeholder-gray-400 bg-white border-2 border-solid border-gray-400 hover:border-indigo-600 focus:outline-indigo-600 rounded-md p-1.5'
					placeholder={placeholder}
				></textarea>
			) : (
				<input
					value={value as string | number}
					onChange={e => {
						const newValue =
							type === 'number' ? parseFloat(e.target.value) : e.target.value;
						setValue(newValue as T);
					}}
					type={type}
					name={identifier}
					id={identifier}
					step={step}
					disabled={disabled}
					required={required}
					className={`w-full h-16 text-2xl text-gray-900 ${
						disabled
							? 'bg-gray-200'
							: 'bg-white hover:border-indigo-600 focus:outline-indigo-600'
					} border-2 border-solid border-gray-400  rounded-md p-1.5`}
					placeholder={placeholder}
					min={type === 'number' ? 0 : undefined}
				/>
			)}
		</div>
	);
}
