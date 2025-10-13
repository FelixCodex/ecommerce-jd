import { createContext, useEffect, useState } from 'react';
import { getUsersRequest } from '../api/products';
import { UserInterface } from '../types';
import { log_data, log_error } from '../utils';

interface UserContextType {
	users: UserInterface[] | null;
	loadingUsers: boolean;
	removeUser: (id: string) => void;
}

interface UserProviderProps {
	children: import('react').ReactElement;
}

export const UserContext = createContext<UserContextType>({
	users: null,
	loadingUsers: true,
	removeUser: () => {
		console.log('Function yet no loaded');
	},
});

export function UserProvider({ children }: UserProviderProps) {
	const [users, setUsers] = useState<UserInterface[] | null>(null);
	const [loadingUsers, setLoadingUsers] = useState(true);

	const getUsers = async () => {
		setLoadingUsers(true);
		try {
			log_data('Starting request users');

			const req = await getUsersRequest();

			log_data('Response from users: ', req);

			if (!req.success) throw new Error('Request failed');
			if (req.response?.status == 200) {
				setUsers(req.response.data);
			} else {
				setUsers([] as UserInterface[]);
			}
		} catch (error) {
			log_error('Error fetching users data: ', error);
		} finally {
			setLoadingUsers(false);
		}
	};

	const removeUser = async (id: string) => {
		setUsers(users ? users.filter(el => el.id != id) : null);
	};

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<UserContext.Provider value={{ users, loadingUsers, removeUser }}>
			{children}
		</UserContext.Provider>
	);
}
