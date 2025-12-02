import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'sonner';
import { SparkleGradient } from './Loading';

export default function Login() {
	const [data, setData] = useState({
		username: '',
		password: '',
		remember: false,
	});
	const [loadingSubmit, setLoadingSubmit] = useState(false);
	const { signIn } = useAuth();
	const navigate = useNavigate();

	const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoadingSubmit(true);
		const signReq = await signIn(data);
		if (signReq.success) {
			navigate('/');
		} else {
			const errorData = signReq.data as { message?: string };
			toast.error(errorData.message || 'Login failed');
		}
		setLoadingSubmit(false);
	};

	return (
		<main className='w-full bg-gray-50 h-screen flex items-start justify-center'>
			<div className='w-full h-full flex items-center justify-center'>
				<div className='bg-indigo-500 bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 p-[2px] rounded-xl border border-gray-200'>
					<form
						className='p-7 gap-8 bg-white rounded-[10px] w-[420px] flex flex-col items-center justify-center'
						onSubmit={handleSubmitLogin}
					>
						<div className='flex items-center justify-between w-full'>
							<h2 className='font-medium text-gray-700 text-3xl'>
								Admin Login
							</h2>
							<span>
								<SparkleGradient
									width={60}
									height={60}
									className={loadingSubmit ? 'loader' : ''}
								/>
							</span>
						</div>
						<div className='flex flex-col gap-2 w-full'>
							<InputText
								label='Username'
								id='username'
								value={data.username}
								setValue={str => {
									setData(prev => ({ ...prev, username: str }));
								}}
								type='text'
								required
							/>
							<InputText
								label='Password'
								id='pass'
								value={data.password}
								setValue={str => {
									setData(prev => ({ ...prev, password: str }));
								}}
								type='password'
								required
							/>
						</div>
						<div className='flex flex-col w-full items-end gap-2 mt-1'>
							<button
								type='submit'
								className='w-full bg-indigo-500 p-2 rounded-md cursor-pointer font-medium text-lg shadow-sm group text-gray-50 hover:bg-indigo-600'
								disabled={loadingSubmit}
							>
								{loadingSubmit ? <p>Logging in..</p> : 'Login'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}
export function InputText({
	label,
	id,
	value,
	placeholder,
	setValue,
	type = 'text',
	required,
}: {
	label: string;
	id: string;
	value: string;
	placeholder?: string;
	setValue: (str: string) => void;
	type?: 'email' | 'text' | 'password';
	required?: boolean;
}) {
	return (
		<div className='flex flex-col items-start justify-start w-full'>
			<label
				htmlFor={id}
				className='text-sm font-medium text-gray-500 w-fit'
			>
				{label}{' '}
				<span className={`text-red-300 ${!required && 'hidden'}`}>*</span>
			</label>
			<input
				id={id}
				value={value}
				onChange={e => {
					setValue(e.target.value);
				}}
				type={type}
				className='w-full flex items-center bg-white border-2 border-gray-400 hover:border-indigo-500 focus:border-indigo-500 rounded-md focus:outline-none p-2 px-3 font-medium text-gray-600'
				required={required}
				placeholder={placeholder}
			/>
		</div>
	);
}
