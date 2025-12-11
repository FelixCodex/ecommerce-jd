import { Check } from 'lucide-react';

export function CheckBox({
	checked,
	onClick,
	label,
}: {
	checked: boolean;
	onClick: () => void;
	label: string;
}) {
	return (
		<div
			className='flex items-center cursor-pointer'
			onClick={() => {
				onClick();
			}}
		>
			<button
				id='remember-me'
				type='button'
				className={`w-6 h-6 sm:w-5 sm:h-5 flex items-center justify-center transition-colors border rounded-md ${
					checked
						? 'bg-[--light_600] border-[--brand_color]'
						: 'bg-[--light_800] border-[--light_500]'
				}`}
			>
				<Check
					className={`text-[--brand_color] w-4 h-4 transition-opacity ${
						checked ? 'opacity-100' : 'opacity-0'
					}`}
				/>
			</button>
			<span className='ml-2 block text-[--light_200] select-none'>{label}</span>
		</div>
	);
}
