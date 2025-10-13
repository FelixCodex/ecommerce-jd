import { CheckCircle2, CircleDashed } from 'lucide-react';
import { FormEvent, MouseEvent, useEffect, useId, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { getUrlParam, replaceString } from '../utils';
import { LANGUAGE } from '../consts';
import { usePreferences } from '../hooks/usePreferences';
import { useSocket } from '../hooks/useSocket';
import { UserInterface } from '../types';
import { GoogleButton } from '../components/GoogleButton';
import { ODivisor } from '../components/ODivisor';
import { useAuth } from '../context/auth.context';
import { useCart } from '../context/cart.context';
import { useChat } from '../context/chat.context';
import { InputText } from '../components/form/InputTextAuth';
import { InputPassword } from '../components/form/InputPassword';

interface SubmitClickProps {
	e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>;
}

interface AxiosResult {
	status: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	response: { data: any };
}

export default function Login() {
	const [formState, setFormState] = useState({
		email: '',
		password: '',
		rememberMe: false,
	});

	const [validation, setValidation] = useState({
		email: null as boolean | null,
		password: null as boolean | null,
		emailShake: false,
		passwordShake: false,
	});

	const [requestState, setRequestState] = useState({
		errors: [] as string[],
		loading: false,
		success: false,
	});

	const { signIn, logged } = useAuth();
	const { preferences } = usePreferences();
	const { loadCart, loadPurchased } = useCart();
	const { loadMessages } = useChat();
	const navigate = useNavigate();
	const errorIdKey = useId();
	const { connectUserToMessageChannel } = useSocket();
	const language = preferences.language;

	const validateEmail = (value: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const isValid = emailRegex.test(value);
		setValidation(prev => ({ ...prev, email: isValid }));
		return isValid;
	};

	const validatePassword = (value: string): boolean => {
		const isValid = value.length >= 6;
		setValidation(prev => ({ ...prev, password: isValid }));
		return isValid;
	};

	const handleInputChange = (field: 'email' | 'password', value: string) => {
		setFormState(prev => ({ ...prev, [field]: value }));

		if (field === 'email') {
			validateEmail(value);
		} else if (field === 'password') {
			validatePassword(value);
		}
	};

	const toggleRememberMe = () => {
		setFormState(prev => ({ ...prev, rememberMe: !prev.rememberMe }));
	};

	const resetForm = () => {
		setFormState(prev => ({ ...prev, email: '', password: '' }));
		setRequestState(prev => ({ ...prev, errors: [] }));
	};

	const handleSubmit = async ({ e }: SubmitClickProps) => {
		e.preventDefault();
		console.log('Starting auth request');

		const { email, password, rememberMe } = formState;
		const isEmailValid = validation.email || validateEmail(email);
		const isPasswordValid = validation.password || validatePassword(password);

		if (isEmailValid && isPasswordValid) {
			setRequestState(prev => ({ ...prev, loading: true }));
			console.log('All fine for auth');

			try {
				const res = (await signIn({
					email,
					password,
					remember: rememberMe,
				})) as AxiosResult;

				if (res.status === 200) {
					const userInfo = res.response.data as UserInterface;
					resetForm();
					setRequestState(prev => ({ ...prev, success: true }));
					connectUserToMessageChannel(userInfo);
				} else {
					setRequestState(prev => ({ ...prev, errors: res.response.data }));
				}
			} catch (error) {
				console.error(error);
				setRequestState(prev => ({
					...prev,
					errors: ['Something went wrong'],
				}));
			} finally {
				setRequestState(prev => ({ ...prev, loading: false }));
			}
		} else {
			if (!isEmailValid) {
				setValidation(prev => ({ ...prev, emailShake: true }));
				setTimeout(() => {
					setValidation(prev => ({ ...prev, emailShake: false }));
				}, 500);
			}

			if (!isPasswordValid) {
				setValidation(prev => ({ ...prev, passwordShake: true }));
				setTimeout(() => {
					setValidation(prev => ({ ...prev, passwordShake: false }));
				}, 500);
			}
		}
	};

	// Check for error in URL params on mount
	useEffect(() => {
		const error = getUrlParam('error');
		if (error) {
			setRequestState(prev => ({ ...prev, errors: [error] }));
		}
	}, []);

	// Redirect if logged in
	useEffect(() => {
		if (logged) {
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);
			let path = replaceString(urlParams.get('path') || '', '-', '/');
			if (path === '') path = '/';

			loadCart();
			loadPurchased();
			loadMessages();
			navigate(path);
		}
	}, [loadCart, loadMessages, loadPurchased, logged, navigate]);

	const { email, password, rememberMe } = formState;
	const {
		email: isEmailValid,
		password: isPasswordValid,
		emailShake,
		passwordShake,
	} = validation;
	const { errors, loading, success } = requestState;
	const isFormValid = isEmailValid && isPasswordValid;

	return (
		<main className='min-h-screen-minus-64 dottedBackground flex justify-center py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-lg w-full space-y-8'>
				<header>
					<h1 className='mt-6 text-center text-3xl font-extrabold text-[--light_0]'>
						{LANGUAGE.LOGIN.TITLE[language]}
					</h1>
				</header>

				<section className='bg-[--bg_sec] rounded-lg shadow-md p-7'>
					<form
						className='space-y-7'
						onSubmit={e => handleSubmit({ e })}
						aria-label='Login form'
					>
						<InputText
							label={LANGUAGE.REGISTER.EMAIL[preferences.language]}
							id='email-address'
							name='email'
							type='email'
							required
							value={email}
							setValue={value => handleInputChange('email', value)}
							validateValue={validateEmail}
							shake={emailShake}
							valValue={validation.email}
							val_valid={LANGUAGE.REGISTER.EMAIL_VALID[preferences.language]}
							val_not_valid={
								LANGUAGE.REGISTER.EMAIL_NOT_VALID[preferences.language]
							}
						/>

						<InputPassword
							label={LANGUAGE.REGISTER.PASS[preferences.language]}
							id='password'
							name='password'
							password={password}
							setPassword={value => handleInputChange('password', value)}
							validatePassword={validatePassword}
							shake={passwordShake}
							valPassword={validation.password}
							pass_valid={LANGUAGE.REGISTER.PASS_VALID[preferences.language]}
							pass_not_valid={
								LANGUAGE.REGISTER.PASS_NOT_VALID[preferences.language]
							}
							pass_not_match={
								LANGUAGE.REGISTER.PASS_NOT_MATCH[preferences.language]
							}
						/>

						{/* Error messages */}
						{errors.length > 0 && (
							<div
								className='flex items-center justify-between'
								role='alert'
							>
								<div className='flex items-center'>
									{errors.map((error, index) => (
										<p
											key={`${errorIdKey}-${index}`}
											className='block text-sm'
											style={{ color: 'var(--wrong)' }}
										>
											{error}
										</p>
									))}
								</div>
							</div>
						)}

						{/* Remember me and Register link */}
						<div className='flex items-center justify-between flex-col'>
							<div className='flex flex-col md:flex-row items-start gap-2 md:items-center justify-between w-full'>
								<div className='flex items-center'>
									<input
										id='remember-me'
										name='remember-me'
										type='checkbox'
										checked={rememberMe}
										onChange={toggleRememberMe}
										className='h-4 w-4 rounded'
									/>
									<label
										htmlFor='remember-me'
										className='ml-2 block text-sm md:text-base text-[--light_300]'
									>
										{LANGUAGE.LOGIN.REMEMBERME[language]}
									</label>
								</div>

								<div className='text-sm md:text-base'>
									<Link
										to='/register'
										className='font-medium text-sm md:text-base text-[--button] hover:text-[--button_hover]'
									>
										{LANGUAGE.LOGIN.DONT_HAVE_ACCOUNT[language]}
									</Link>
								</div>
							</div>
						</div>

						{/* Submit button */}
						<div>
							<button
								type='submit'
								disabled={!isFormValid || loading}
								aria-busy={loading}
								className={`
                  group h-12 relative w-full flex justify-center items-center py-2 px-4 
                  border border-transparent text-md font-medium rounded-md text-[--light_900]
                  ${
										!isFormValid
											? 'cursor-not-allowed bg-[--button_not_allowed]'
											: 'bg-[--button] hover:bg-[--button_hover] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--button]'
									}
                `}
							>
								{loading ? (
									<CircleDashed
										className='loader'
										aria-hidden='true'
									/>
								) : (
									<span>{LANGUAGE.LOGIN.SIGNIN[language]}</span>
								)}
								{success && (
									<CheckCircle2
										style={{ color: 'white' }}
										aria-hidden='true'
									/>
								)}
							</button>
						</div>
					</form>

					<ODivisor />

					<GoogleButton
						text={LANGUAGE.LOGIN.SIGNIN_GOOGLE[language]}
						url='https://modelfantasy.up.railway.app/app/auth/google'
						disabled={loading}
					/>
				</section>
			</div>
		</main>
	);
}
