import { createContext, useEffect, useState } from 'react';
import { loginRequest, logoutRequest, verifyTokenRequest } from '../api/auth';
import { log_data, log_error } from '../utils';

interface AuthContextType {
	logged: boolean;
	loadingLog: boolean;
	signIn: (user: {
		password: string;
		username: string;
	}) => Promise<SignInReturn>;
	signOut: () => void;
}

interface AuthProviderProps {
	children: import('react').ReactElement;
}

export const AuthContext = createContext<AuthContextType>({
	logged: false,
	loadingLog: true,
	signIn: async () => {
		return { success: false, data: {} };
	},
	signOut: async () => {},
});

type SignInReturn = { success: boolean; data: unknown };

export function AuthProvider({ children }: AuthProviderProps) {
	const [logged, setLogged] = useState(false);
	const [loadingLog, setLoadingLog] = useState(true);

	const signIn = async (user: {
		password: string;
		username: string;
	}): Promise<SignInReturn> => {
		try {
			log_data('Starting log in');

			const req = await loginRequest(user);

			log_data('Response from login', req);

			if (!req.success) throw new Error('Request failed');
			if (req.response?.status == 200) {
				setLogged(true);
			}
			return { success: true, data: req };
		} catch (error) {
			log_error(error);
			return { success: false, data: error };
		}
	};

	const signOut = async () => {
		try {
			await logoutRequest();
			setLogged(false);
		} catch (error) {
			log_error(error);
			return error;
		}
	};

	const verifyToken = async () => {
		try {
			const req = await verifyTokenRequest();
			if (!req.success) throw new Error('Request failed');
			if (req.response?.status == 200) {
				setLogged(true);
				setLoadingLog(false);
				return;
			}
			setLogged(false);
			setLoadingLog(false);
		} catch (error) {
			log_error(error);
			setLogged(false);
			setLoadingLog(false);
		}
	};

	useEffect(() => {
		verifyToken();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				loadingLog,
				logged,
				signIn,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
