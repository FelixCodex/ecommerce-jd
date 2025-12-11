import { CheckTiny } from './Elements/CheckTiny';
import { XTiny } from './Elements/XTiny';

interface ToggleProps {
	label: string;
	description: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
}

export function Toggle({ label, description, checked, onChange }: ToggleProps) {
	return (
		<div className='flex items-center justify-between'>
			<div>
				<h4 className='text-sm font-medium text-[--light_100]'>{label}</h4>
				<p className='text-sm text-[--light_200]'>{description}</p>
			</div>
			<button
				type='button'
				className={`${
					checked
						? 'bg-[--button] focus:ring-[--brand_color]'
						: 'bg-[--light_200] focus:ring-[--light_200]'
				} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-[background-color,box-shadow] duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[--brand_color] focus:ring-offset-[--bg_prim] focus:ring-offset-2`}
				role='switch'
				aria-checked={checked}
				onClick={() => onChange(!checked)}
			>
				<span
					className={`${
						checked ? 'translate-x-5' : 'translate-x-0'
					} pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-[--light_900] shadow ring-0 transition duration-200 ease-in-out`}
				>
					<span
						className={`${
							checked
								? 'opacity-0 duration-100 ease-out'
								: 'opacity-100 duration-200 ease-in'
						} absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
						aria-hidden='true'
					>
						<XTiny className='h-3 w-3 text-[--light_200]' />
					</span>
					<span
						className={`${
							checked
								? 'opacity-100 duration-200 ease-in'
								: 'opacity-0 duration-100 ease-out'
						} absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
						aria-hidden='true'
					>
						<CheckTiny className='h-3 w-3 text-[--brand_color]' />
					</span>
				</span>
			</button>
		</div>
	);
}
