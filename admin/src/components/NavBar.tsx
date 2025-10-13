import { Link, useLocation } from 'react-router-dom';
import { API_URL } from '../consts';
import { Sidebar, X } from 'lucide-react';
import { useCallback, useState } from 'react';

const link_style =
	'text-indigo-900 hover:text-indigo-500 py-2 px-3 rounded-md bg-indigo-50 text-xl w-full flex items-center';
const selected_style = 'bg-indigo-200 hover:text-indigo-900';

export function Navbar() {
	const location = useLocation();
	const [mobileOpen, setMobileOpen] = useState(false);

	const closeSidebar = useCallback(() => {
		setMobileOpen(false);
	}, []);

	return (
		<nav className={`z-20 relative flex`}>
			<button
				className='absolute top-2 left-3 bg-white shadow w-fit h-fit items-center justify-center p-2 rounded-md border border-gray-300 text-gray-600 cursor-pointer hover:border-gray-400 transition-colors flex lg:hidden'
				onClick={() => {
					setMobileOpen(true);
				}}
			>
				<Sidebar className='w-5 h-5' />
			</button>
			<div
				className={`bg-white z-20 fixed ${
					mobileOpen ? 'left-0' : '-left-full'
				} lg:static flex rounded-r-lg shadow-gray-300 flex-col shadow min-w-72 w-72 h-full transition-[left]`}
			>
				<span className='flex items-center justify-between p-4 h-[73px] text-2xl font-bold text-indigo-600 border-b border-gray-200 w-full'>
					Admin Dashboard
					<button
						className='p-2 rounded-md border  items-center justify-center border-gray-300 text-gray-600 cursor-pointer hover:border-gray-400 transition-colors flex lg:hidden'
						onClick={() => {
							setMobileOpen(false);
						}}
					>
						<X className='w-5 h-5' />
					</button>
				</span>
				<div className='flex flex-col justify-center items-start relative gap-3 p-4 w-full'>
					<Link
						draggable={false}
						to='/'
						className={` text-nowrap flex-wrap ${
							location.pathname == '/' && selected_style
						} ${link_style}`}
						onClick={() => {
							closeSidebar();
						}}
					>
						Add product
					</Link>

					<Link
						draggable={false}
						to='/products'
						className={` ${
							location.pathname == '/products' && selected_style
						} ${link_style}`}
						onClick={() => {
							closeSidebar();
						}}
					>
						Products
					</Link>

					<Link
						draggable={false}
						to='/metrics'
						className={` ${
							location.pathname == '/metrics' && selected_style
						} ${link_style}`}
						onClick={() => {
							closeSidebar();
						}}
					>
						Metrics
					</Link>

					<Link
						draggable={false}
						to='/chats'
						className={` ${
							location.pathname == '/chats' && selected_style
						} ${link_style}`}
						onClick={() => {
							closeSidebar();
						}}
					>
						Chats
					</Link>

					<Link
						draggable={false}
						to='/users'
						className={` ${
							location.pathname == '/users' && selected_style
						} ${link_style}`}
						onClick={() => {
							closeSidebar();
						}}
					>
						Users
					</Link>

					<Link
						draggable={false}
						to='/payments'
						className={` ${
							location.pathname == '/payments' && selected_style
						} ${link_style}`}
						onClick={() => {
							closeSidebar();
						}}
					>
						Payments
					</Link>

					<Link
						draggable={false}
						to='/beneficiarys'
						className={` ${
							location.pathname == '/beneficiarys' && selected_style
						} ${link_style}`}
						onClick={() => {
							closeSidebar();
						}}
					>
						Beneficiarys
					</Link>

					<a
						draggable={false}
						href={`${API_URL}d/auth`}
						className={`text-white hover:bg-indigo-600 bg-indigo-500 py-2 px-3 flex items-center w-full rounded-md text-xl`}
					>
						Auth Drive
					</a>
				</div>
			</div>
		</nav>
	);
}
