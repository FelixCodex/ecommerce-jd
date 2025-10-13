import { createContext, useContext, useEffect, useState } from 'react';
import {
	loginRequest,
	logoutRequest,
	registerRequest,
	verifyTokenRequest,
} from '../Api/auth';
import { Preferences, UserInterface } from '../types';
import { useSocket } from '../hooks/useSocket';
import { log_data, log_error } from '../utils';

interface AuthContextType {
	user: UserInterface | null;
	logged: boolean;
	loadingLog: boolean;
	signUp: (user: {
		password: string;
		username: string;
		email: string;
		remember: boolean;
	}) => Promise<void | unknown>;
	signIn: (user: {
		password: string;
		email: string;
		remember: boolean;
	}) => Promise<void | unknown>;
	signOut: () => void;
	setUserPreferences: (pref: Preferences) => void;
}

interface AuthProviderProps {
	children: import('react').ReactElement;
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	logged: false,
	loadingLog: true,
	signUp: async () => {},
	signIn: async () => {},
	signOut: async () => {},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setUserPreferences: async (pref: Preferences) => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<UserInterface | null>(null);
	const [logged, setLogged] = useState(true);
	const [loadingLog, setLoadingLog] = useState(true);
	const { connectUserToMessageChannel } = useSocket();

	const signUp = async (user: {
		password: string;
		username: string;
		email: string;
		remember: boolean;
	}) => {
		try {
			const req = await registerRequest(user);
			if (!req.success) throw new Error('Register request failed');
			if (req.response?.status == 201) {
				setUser(req.response?.data);
				setLogged(true);
			}
			return req;
		} catch (error) {
			log_error(error);
			return error;
		}
	};

	const signIn = async (user: {
		password: string;
		email: string;
		remember: boolean;
	}) => {
		try {
			const req = await loginRequest(user);
			log_data(req);
			if (!req.success) throw new Error('Register request failed');
			if (req.response?.status == 200) {
				setUser(req.response?.data);
				setLogged(true);
			}
			return req;
		} catch (error) {
			log_error(error);
			return error;
		}
	};

	const signOut = async () => {
		try {
			await logoutRequest();
			setUser(null);
			setLogged(false);
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const verifyToken = async () => {
		try {
			const req = await verifyTokenRequest();
			if (!req.success) throw new Error('Request failed');
			if (req.response?.status != 200) {
				setUser(null);
				setLoadingLog(false);
				setLogged(false);
				return;
			}
			const data = req.response?.data;
			setUser({
				...data,
				preferences: data.preferences,
			});
			connectUserToMessageChannel({ id: data.id });
			setLogged(true);
			setLoadingLog(false);
		} catch (error) {
			log_error(error);
			setLogged(false);
			setUser(null);
			setLoadingLog(false);
		}
	};

	const setUserPreferences = (pref: Preferences) => {
		if (user) {
			const newState = {
				username: user.username,
				email: user.email,
				id: user.id,
				preferences: pref,
			};
			setUser(newState);
		}
	};

	useEffect(() => {
		verifyToken();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUserPreferences,
				loadingLog,
				logged,
				signUp,
				signIn,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context == undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
