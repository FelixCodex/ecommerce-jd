import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.tsx';
import { Loading } from '../pages/Loading.tsx';
import { Navbar } from '../components/NavBar.tsx';

// function BG_Loader() {
//   return (
//     <div
//       title="Loading..."
//       className="w-full h-44 bg-[--protected_loading] bg-loader rounded-2xl"
//     ></div>
//   );
// }

export default function ProtectedRoute() {
	const { logged, loadingLog } = useAuth();

	if (loadingLog) return <Loading></Loading>;
	if (!loadingLog && !logged)
		return (
			<Navigate
				to={`/login`}
				replace
			></Navigate>
		);

	return (
		<>
			<Navbar />
			<Outlet></Outlet>
		</>
	);
}
