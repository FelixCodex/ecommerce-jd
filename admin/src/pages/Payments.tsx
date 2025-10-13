import { useState } from 'react';
import { usePayment } from '../hooks/usePayment';
import { PaymentInterface } from '../types';
import { createDateTextFromLanguage } from '../utils';
import { Search } from 'lucide-react';

function PaymentCard({ payment }: { payment: PaymentInterface }) {
	return (
		<div className='w-full border-2 bg-white border-gray-400 rounded-lg hover:shadow-lg hover:scale-[101%] transition-[scale,box-shadow] shadow-md p-3 flex flex-row justify-between gap-1'>
			<div className='flex flex-col justify-between items-start text-2xl gap-1'>
				<p className='text-xl'>
					ID: <span className='ml-2 font-semibold'>{payment.id}</span>
				</p>
				<p className='flex justify-start text-xl'>
					UserID: <span className='ml-2 font-semibold'>{payment.userId}</span>
				</p>
				<p className='flex justify-start text-xl'>
					Price: $<span className='font-semibold'>{payment.price}</span>
				</p>
			</div>
			<div className='flex flex-col justify-between items-end gap-1'>
				<div
					className={`flex justify-center rounded-md w-48 ${
						payment.state == '1'
							? 'bg-blue-400'
							: payment.state == '2'
							? 'bg-green-400'
							: 'bg-red-400'
					}`}
				>
					<p className='text-2xl text-gray-800 p-0.5'>
						{payment.state == '1'
							? 'Pending'
							: payment.state == '2'
							? 'Completed'
							: 'Failed'}
					</p>
				</div>
				{payment.bookingDate && (
					<p className=' text-xl'>{`Pagado el ${createDateTextFromLanguage(
						'es',
						new Date(payment.bookingDate)
					)}`}</p>
				)}

				<p className=' text-xl'>{`Creado el ${createDateTextFromLanguage(
					'es',
					new Date(payment.created_at)
				)}`}</p>
			</div>
		</div>
	);
}

export function Payments() {
	const { payments, loadingPayments } = usePayment();
	const [filter, setFilter] = useState('');
	const filteredPayments = payments?.filter(
		payment =>
			payment.id.toLowerCase().includes(filter.toLowerCase()) ||
			payment.created_at.toLowerCase().includes(filter.toLowerCase()) ||
			payment.orderId.toLowerCase().includes(filter.toLowerCase()) ||
			payment.state.toLowerCase().includes(filter.toLowerCase())
	);
	return (
		<div className='w-screen h-screen flex pt-12 p-4 flex-col items-center'>
			<div className='w-full max-w-[83.12rem] bg-white rounded-lg shadow flex items-center'>
				<input
					type='text'
					name='filter'
					id='filter'
					value={filter}
					onChange={e => {
						setFilter(e.target.value);
					}}
					placeholder='Find payment...'
					className='w-full text-2xl rounded-l-lg h-14 p-4 focus:outline-indigo-500'
				/>
				<button className='w-16 h-14 flex items-center justify-center hover:bg-indigo-100 group rounded-r-lg'>
					<Search className='w-8 h-8 group-hover:text-indigo-500'></Search>
				</button>
			</div>
			<div className='w-full max-w-[1330px] max-h-screen overflow-auto p-2 mt-3 gap-4 flex flex-col items-center'>
				{loadingPayments ? (
					<span className='text-xl'>Cargando pagos...</span>
				) : filteredPayments && filteredPayments.length > 0 ? (
					filteredPayments.map(payment => {
						return <PaymentCard payment={payment}></PaymentCard>;
					})
				) : (
					<span className='text-2xl'>No se encontro ningun pago</span>
				)}
			</div>
		</div>
	);
}
