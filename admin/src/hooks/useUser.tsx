import { useContext } from 'react';
import { UserContext } from '../context/users.context';

export const useUser = () => {
	const context = useContext(UserContext);
	if (context == undefined) {
		throw new Error('useProduct must be used within a UsersProvider');
	}
	return context;
};
