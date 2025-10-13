import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductAdder } from '../pages/ProductAdder.tsx';
import { Toaster } from 'sonner';
import { Users } from '../pages/Users.tsx';
import { Payments } from '../pages/Payments.tsx';
import { Products } from '../pages/Products.tsx';
import { Metrics } from '../pages/Metrics.tsx';
import { Chats } from '../pages/Chats.tsx';
import { Beneficiarys } from '../pages/Beneficiaries.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import Login from '../pages/Login.tsx';

export function AppRouter() {
	return (
		<Router>
			<Toaster
				richColors
				closeButton
				position='top-right'
			></Toaster>
			<main className='h-screen w-screen flex '>
				<Suspense>
					<Routes>
						<Route
							path='/login'
							element={<Login />}
						/>
						<Route element={<ProtectedRoute />}>
							<Route
								path='/'
								element={<ProductAdder />}
							/>
							<Route
								path='/users'
								element={<Users />}
							/>
							<Route
								path='/payments'
								element={<Payments />}
							/>
							<Route
								path='/products'
								element={<Products />}
							/>
							<Route
								path='/metrics'
								element={<Metrics />}
							/>
							<Route
								path='/chats'
								element={<Chats />}
							/>
							<Route
								path='/beneficiarys'
								element={<Beneficiarys />}
							/>
						</Route>
					</Routes>
				</Suspense>
			</main>
		</Router>
	);
}
