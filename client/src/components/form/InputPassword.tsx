import { useState } from 'react';
import { Eye } from '../Elements/Eye';
import { EyeOff } from '../Elements/EyeOff';
import { CheckCircle } from '../Elements/CheckCircle';
import { XCircle } from '../Elements/XCircle';

interface InputPasswordRepeatInterface {
	label: string;
	id: string;
	name: string;
	password: string;
	setPassword: (val: string) => void;
	valPassword: boolean | null;
	validatePassword: (val1: string) => void;
	shake: boolean;
	pass_valid: string;
	pass_not_valid: string;
	pass_not_match: string;
}

export function InputPassword({
	label,
	id,
	name,
	password,
	setPassword,
	valPassword,
	validatePassword,
	shake,
	pass_valid,
	pass_not_valid,
	pass_not_match,
}: InputPasswordRepeatInterface) {
	const [passwordVisible, setPasswordVisible] = useState(false);
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
				type={passwordVisible ? 'text' : 'password'}
				autoComplete='current-password'
				required
				value={password}
				onChange={e => {
					setPassword(e.target.value);
					validatePassword(e.target.value);
				}}
				className={`${
					shake && 'shake !border-[--wrong]'
				} appearance-none text-md h-12 my-1 rounded-lg relative block w-full px-3 py-2 border bg-[--bg_prim] border-[--light_500] text-[--light_0] placeholder-gray-500 focus:outline-none focus:ring-[--brand_color] focus:border-[--brand_color] focus:z-10`}
			/>
			<div className='absolute w-6 h-6 right-2 top-0.5'>
				<button
					className='flex justify-center items-center'
					onClick={e => {
						e.preventDefault();
						setPasswordVisible(!passwordVisible);
					}}
				>
					{passwordVisible ? <Eye></Eye> : <EyeOff></EyeOff>}
				</button>
			</div>
			<div
				className={`absolute w-6 h-6 check z-10 ${
					valPassword == null && 'hidden'
				} ${
					valPassword != null
						? password.length < 6
							? '[&::before]:text-[--wrong]'
							: '[&::before]:text-[--good]'
						: 'text-transparent'
				}  ${
					valPassword != null &&
					(valPassword ? 'text-[--good]' : 'text-[--wrong]')
				} group`}
			>
				{valPassword ? <CheckCircle className='right-1' /> : <XCircle />}

				<span className='tooltiptext group-hover:visible max-w-[80vw] after:border-transparent right-[140%] lg:right-auto lg:left-[140%] shadow-sm shadow-[--light_500] text-[--light_0] bg-[--bg_sec] after:border-r-[--bg_thir]'>
					{valPassword
						? pass_valid
						: password.length < 6
						? pass_not_valid
						: pass_not_match}
				</span>
			</div>
		</div>
	);
}
