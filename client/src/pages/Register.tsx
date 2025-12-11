import { CheckCircle2, CircleDashed } from 'lucide-react';
import { MouseEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { LANGUAGE } from '../consts';
import { usePreferences } from '../hooks/usePreferences';
import { ODivisor } from '../components/Elements/ODivisor';
import { GoogleButton } from '../components/Elements/GoogleButton';
import { InputText } from '../components/form/InputTextAuth';
import { InputPasswordRepeat } from '../components/form/InputPasswordRepeat';
import { useAuth } from '../context/auth.context';
import { RegisterFormData, ValidationState } from '../types';
import { CheckBox } from '../components/form/CheckBox';
import { AxiosError } from 'axios';

const formDataInitialState = {
	email: '',
	username: '',
	password: '',
	password2: '',
};

const validationInitialState = {
	username: null,
	email: null,
	password: null,
};

export default function Register() {
	const [formData, setFormData] =
		useState<RegisterFormData>(formDataInitialState);

	const [validation, setValidation] = useState<ValidationState>(
		validationInitialState
	);

	const [errors, setErrors] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [rememberMe, setRememberMe] = useState<boolean>(false);

	const { signUp, logged } = useAuth();
	const navigate = useNavigate();
	const { preferences } = usePreferences();
	const language = preferences.language;

	const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const { username, email, password } = validation;

		if (username && email && password) {
			setIsLoading(true);

			try {
				const res = await signUp({
					username: formData.username,
					email: formData.email,
					password: formData.password,
					remember: rememberMe,
				});

				if (res.success) {
					setIsSuccess(true);
					resetForm();
				} else {
					const error = res.error as AxiosError;
					if (!error) throw new Error('Unkown Error');
					const response = error.response;
					console.log('Error: ', error.message);
					if (!response) throw new Error(error.message);
					console.log('Response: ', response);

					setErrors(response.data as string[]);
				}
			} catch (error) {
				const message = (error as { message: string }).message;
				if (message == 'Network Error') {
					setErrors(['Check your connection']);
					return;
				}
				setErrors(['Something went wrong']);
			} finally {
				setIsLoading(false);
			}
		}
	};

	useEffect(() => {
		if (logged) navigate('/');
	}, [logged, navigate]);

	const validateUsername = (value: string) => {
		const isValid = value.length >= 3;
		setValidation(prev => ({ ...prev, username: isValid }));
		return isValid;
	};

	const validateEmail = (value: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const isValid = emailRegex.test(value);
		setValidation(prev => ({ ...prev, email: isValid }));
		return isValid;
	};

	const validatePassword = (value: string, value2: string) => {
		const isValid = value.length >= 6 && value2.length >= 6 && value === value2;
		setValidation(prev => ({ ...prev, password: isValid }));
		return isValid;
	};

	// Reset form to initial state
	const resetForm = () => {
		setFormData(formDataInitialState);
		setValidation(validationInitialState);
	};

	const handleInputChange = (field: keyof RegisterFormData, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));

		// Validate the field as it changes
		if (field === 'username') {
			validateUsername(value);
		} else if (field === 'email') {
			validateEmail(value);
		} else if (field === 'password' || field === 'password2') {
			validatePassword(formData.password, formData.password2);
		}
	};

	const isSubmitDisabled =
		isSuccess ||
		isLoading ||
		!validation.username ||
		!validation.email ||
		!validation.password;

	return (
		<div className='min-h-screen-minus-64 dottedBackground flex justify-center py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-lg w-full space-y-8'>
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-[--light_0]'>
						{LANGUAGE.REGISTER.TITLE[language]}
					</h2>
				</div>
				<div className='rounded-xl shadow-md p-7 bg-[--bg_sec]'>
					<form className='space-y-7'>
						<div className={`rounded-md shadow-sm flex flex-col gap-1 `}>
							<InputText
								label={LANGUAGE.REGISTER.USERNAME[language]}
								id='username'
								name='username'
								type='text'
								required
								value={formData.username}
								setValue={value => handleInputChange('username', value)}
								validateValue={validateUsername}
								valValue={validation.username}
								val_valid={LANGUAGE.REGISTER.USERNAME_VALID[language]}
								val_not_valid={LANGUAGE.REGISTER.USERNAME_NOT_VALID[language]}
							/>
							<InputText
								label={LANGUAGE.REGISTER.EMAIL[language]}
								id='email-address'
								name='email'
								type='email'
								required
								value={formData.email}
								setValue={value => handleInputChange('email', value)}
								validateValue={validateEmail}
								valValue={validation.email}
								val_valid={LANGUAGE.REGISTER.EMAIL_VALID[language]}
								val_not_valid={LANGUAGE.REGISTER.EMAIL_NOT_VALID[language]}
							/>

							<InputPasswordRepeat
								label1={LANGUAGE.REGISTER.PASS[language]}
								id1='password'
								name1='password'
								label2={LANGUAGE.REGISTER.REPEAT_PASS[language]}
								id2='password2'
								name2='password2'
								password1={formData.password}
								password2={formData.password2}
								setPassword1={value => handleInputChange('password', value)}
								setPassword2={value => handleInputChange('password2', value)}
								validatePassword={validatePassword}
								valPassword={validation.password}
								pass_valid={LANGUAGE.REGISTER.PASS_VALID[language]}
								pass_not_valid={LANGUAGE.REGISTER.PASS_NOT_VALID[language]}
								pass_not_match={LANGUAGE.REGISTER.PASS_NOT_MATCH[language]}
							/>
						</div>

						{errors.length > 0 && (
							<div className='flex items-center justify-between'>
								<div className='flex items-center flex-col justify-start'>
									{errors.map((error, index) => (
										<p
											key={`error-${index}`}
											className='block w-full'
											style={{ color: 'var(--wrong)' }}
										>
											{error}
										</p>
									))}
								</div>
							</div>
						)}

						<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between'>
							<CheckBox
								checked={rememberMe}
								onClick={() => {
									setRememberMe(!rememberMe);
								}}
								label={LANGUAGE.REGISTER.REMEMBERME[language]}
							/>

							<div className='text-md'>
								<Link
									to='/login'
									className='font-medium text-[--button] hover:text-[--button_hover]'
								>
									{LANGUAGE.REGISTER.ALREADY_ACCOUNT[language]}
								</Link>
							</div>
						</div>

						<div>
							<button
								type='submit'
								disabled={isSubmitDisabled}
								className={`${
									isSubmitDisabled
										? 'cursor-not-allowed bg-[--button_not_allowed]'
										: 'bg-[--button] hover:bg-[--button_hover] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--brand_color]'
								} group relative h-12 w-full items-center flex justify-center gap-2 py-2 px-4 border border-transparent text-md font-medium rounded-md text-[--light_900]`}
								onClick={e => {
									handleSubmit(e);
								}}
							>
								{isLoading ? (
									<CircleDashed className='loader' />
								) : (
									<span>{LANGUAGE.REGISTER.SIGNUP[language]}</span>
								)}
								{isSuccess && <CheckCircle2 className='text-[--light_0]' />}
							</button>
						</div>
					</form>

					<ODivisor></ODivisor>

					<GoogleButton
						text={LANGUAGE.LOGIN.SIGNIN_GOOGLE[language]}
						url={`https://3dcute.up.railway.app/app/auth/google`}
						disabled={isLoading}
					></GoogleButton>
				</div>
			</div>
		</div>
	);
}
