import { useState } from 'react';
import { Eye } from '../Elements/Eye';
import { EyeOff } from '../Elements/EyeOff';
import { CheckCircle } from '../Elements/CheckCircle';
import { XCircle } from '../Elements/XCircle';

interface InputPasswordRepeatInterface {
	label1: string;
	label2: string;
	id1: string;
	id2: string;
	name1: string;
	name2: string;
	password1: string;
	password2: string;
	setPassword1: (val: string) => void;
	setPassword2: (val: string) => void;
	valPassword: boolean | null;
	validatePassword: (val1: string, val2: string) => void;
	shake?: boolean;
	pass_valid: string;
	pass_not_valid: string;
	pass_not_match: string;
}

export function InputPasswordRepeat({
	label1,
	label2,
	id1,
	id2,
	name1,
	name2,
	password1,
	password2,
	setPassword1,
	setPassword2,
	valPassword,
	validatePassword,
	shake,
	pass_valid,
	pass_not_valid,
	pass_not_match,
}: InputPasswordRepeatInterface) {
	const [passwordVisible, setPasswordVisible] = useState(false);
	return (
		<>
			<div className='relative'>
				<label
					htmlFor={id1}
					className='sr-only'
				>
					{label1}
				</label>
				<label
					htmlFor={id1}
					className='text-md font-medium text-[--light_200]'
				>
					{label1}
				</label>
				<input
					id={id1}
					name={name1}
					type={passwordVisible ? 'text' : 'password'}
					autoComplete='current-password'
					required
					value={password1}
					onChange={e => {
						setPassword1(e.target.value);
						validatePassword(e.target.value, password2);
					}}
					className={`${
						shake && 'shake !border-[--wrong]'
					} appearance-none text-md h-12 my-1 rounded-lg relative block w-full px-3 py-2 border bg-[--bg_prim] border-[--light_500] text-[--light_0] placeholder-gray-500 focus:outline-none focus:ring-[--brand_color] focus:border-[--brand_color] focus:z-10`}
				/>
				<div className='absolute w-6 h-6 eye mr-1'>
					<button
						className='flex justify-center items-center'
						onClick={e => {
							e.preventDefault();
							setPasswordVisible(!passwordVisible);
						}}
					>
						{passwordVisible ? <Eye /> : <EyeOff />}
					</button>
				</div>
				<div
					className={`absolute w-6 h-6 pass-check ${
						valPassword == null && 'hidden'
					} ${
						valPassword != null
							? password1.length < 6
								? '[&::before]:text-[--wrong]'
								: '[&::before]:text-[--good]'
							: 'text-transparent'
					} ${
						valPassword != null
							? password2.length < 6
								? '[&::after]:text-[--wrong]'
								: '[&::after]:text-[--good]'
							: 'text-transparent'
					} ${
						valPassword != null &&
						(valPassword ? 'text-[--good]' : 'text-[--wrong]')
					} group`}
				>
					{valPassword ? <CheckCircle /> : <XCircle />}

					<span className='tooltiptext group-hover:visible max-w-[80vw] after:border-transparent right-[140%] lg:right-auto lg:left-[140%] shadow-sm shadow-[--light_500] text-[--light_0] bg-[--bg_sec] after:border-r-[--bg_thir]'>
						{valPassword
							? pass_valid
							: password1.length < 6 || password2.length < 6
							? pass_not_valid
							: pass_not_match}
					</span>
				</div>
			</div>
			<div className='relative'>
				<label
					htmlFor={id2}
					className='sr-only'
				>
					{label2}
				</label>
				<label
					htmlFor={id2}
					className='text-md font-medium text-[--light_200]'
				>
					{label2}
				</label>
				<input
					id={id2}
					name={name2}
					type={passwordVisible ? 'text' : 'password'}
					autoComplete='current-password'
					required
					value={password2}
					onChange={e => {
						setPassword2(e.target.value);
						validatePassword(e.target.value, password1);
					}}
					className={`${
						shake && 'shake !border-[--wrong]'
					} appearance-none text-md h-12 my-1 rounded-lg relative block w-full px-3 py-2 border bg-[--bg_prim] border-[--light_500] text-[--light_0] placeholder-gray-500 focus:outline-none focus:ring-[--brand-color] focus:border-[--brand_color] focus:z-10`}
				/>
				<div className='absolute w-6 h-6 eye mr-1'>
					<button
						className='flex justify-center items-center'
						onClick={e => {
							e.preventDefault();
							setPasswordVisible(!passwordVisible);
						}}
					>
						{passwordVisible ? <Eye /> : <EyeOff />}
					</button>
				</div>
			</div>
		</>
	);
}
