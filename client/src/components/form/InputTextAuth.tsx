import { CheckCircle } from '../Elements/CheckCircle';
import { XCircle } from '../Elements/XCircle';

interface InputInterface {
	label: string;
	id: string;
	name: string;
	type: string;
	autoComplete?: string;
	required: boolean;
	value: string;
	setValue: (val: string) => void;
	valValue: boolean | null;
	validateValue: (val: string) => void;
	shake?: boolean;
	val_valid: string;
	val_not_valid: string;
}

export function InputText({
	label,
	id,
	name,
	type,
	autoComplete,
	required,
	value,
	setValue,
	valValue,
	validateValue,
	shake,
	val_valid,
	val_not_valid,
}: InputInterface) {
	return (
		<div className='relative'>
			<label
				htmlFor={id}
				className='sr-only'
			>
				{label}
			</label>
			<label
				htmlFor={id}
				className='text-md font-medium text-[--light_200]'
			>
				{label}
			</label>
			<input
				id={id}
				name={name}
				type={type}
				autoComplete={
					type == 'email'
						? autoComplete
							? autoComplete
							: undefined
						: undefined
				}
				required={required}
				value={value}
				onChange={e => {
					setValue(e.target.value);
					validateValue(e.target.value);
				}}
				className={`${
					shake && 'shake !border-[--wrong]'
				} appearance-none text-md h-12 my-1 rounded-lg relative block w-full px-3 py-2 border bg-[--bg_prim] border-[--light_500] text-[--light_0] placeholder-gray-500 focus:outline-none focus:ring-[--brand_color] focus:border-[--brand_color] focus:z-10`}
			/>
			<div
				className={`absolute w-6 h-6 check group z-10 ${
					valValue == null && 'hidden'
				}`}
				style={{
					color: valValue ? 'var(--good)' : 'var(--wrong)',
				}}
			>
				{valValue ? <CheckCircle></CheckCircle> : <XCircle></XCircle>}
				<span className='tooltiptext group-hover:visible after:border-transparent right-[140%] lg:right-auto lg:left-[140%] shadow-sm shadow-[--light_500] text-[--light_0] bg-[--bg_sec] after:border-r-[--bg_thir]'>
					{valValue ? <> {val_valid}</> : <>{val_not_valid}</>}
				</span>
			</div>
		</div>
	);
}
