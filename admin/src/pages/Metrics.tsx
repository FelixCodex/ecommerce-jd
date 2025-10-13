import { useCallback, useEffect, useState } from 'react';
import { HorizontalChart } from '../components/ApexCharts/HorizontalBar';
import { LineChart } from '../components/ApexCharts/LineChart';
import { StackedBarChart } from '../components/ApexCharts/StackedBarChart';
import { MetricCard } from '../components/Badge';
import { usePayment } from '../hooks/usePayment';
import { useProduct } from '../hooks/useProduct';
import { usePurchase } from '../hooks/usePurchase';
import { useUser } from '../hooks/useUser';
import {
	CalendarDaysIcon,
	CircleDashed,
	CircleDollarSignIcon,
	Coins,
	Package,
} from 'lucide-react';
import { formatDateTime } from '../utils';

const MonthsShorted = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

const MonthsDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// type FilterType = "week" | "month" | "year" | "fullyear" | "alltime";

export function Metrics() {
	const { purchases } = usePurchase();
	const { payments } = usePayment();
	const { users } = useUser();
	const { products } = useProduct();
	const [filter, setFilter] = useState({ type: 'week', aux: '' });
	const [datesByFilter, setDatesByFilter] = useState<string[]>([]);

	const [gains, setGains] = useState<number[]>([]);
	const [usersCreated, setUsersCreated] = useState<number[]>([]);

	const [totalSells, setTotalSells] = useState<number>(0);
	const [totalSellsToday, setTotalSellsToday] = useState<number>(0);
	const [totalSellsMonth, setTotalSellsMonth] = useState<number>(0);

	const [totalProductSells, setTotalProductSells] = useState<number[]>([]);
	const [totalProductSellsN, setTotalProductSellsN] = useState<string[]>([]);
	const [productsSelled, setProductsSelled] = useState<
		{ name: string; data: number[] }[]
	>([]);

	const getDateByFilter = () => {
		const date = new Date();
		const data = [] as string[];

		if (filter.type == 'week') {
			for (let i = 0; i < 7; i++) {
				const dateActual = new Date(
					date.getFullYear(),
					date.getMonth(),
					date.getDate() - i
				);
				data.push(
					`${MonthsShorted[dateActual.getMonth()]} ${dateActual.getDate()}`
				);
			}
			return data.reverse();
		}
		if (filter.type == 'month') {
			for (let i = 1; i <= MonthsDays[date.getMonth()]; i++) {
				const dateActual = new Date(date.getFullYear(), date.getMonth(), i);
				data.push(
					`${MonthsShorted[dateActual.getMonth()]} ${dateActual.getDate()}`
				);
			}
		}
		if (filter.type == 'year') {
			for (let i = 0; i < 12; i++) {
				data.push(`${MonthsShorted[i]}`);
			}
		}
		return data;
	};

	const checkDateIsCorrect = (str: string, checkDate: Date) => {
		const date = new Date(str + ' UTC');
		return (
			date.getFullYear() == checkDate.getFullYear() &&
			date.getMonth() == checkDate.getMonth() &&
			date.getDate() == checkDate.getDate()
		);
	};

	const checkMonthIsCorrect = (str: string, checkDate: Date) => {
		const date = new Date(str + ' UTC');
		return (
			date.getFullYear() == checkDate.getFullYear() &&
			date.getMonth() == checkDate.getMonth()
		);
	};

	const calculateGainsData = useCallback(() => {
		if (!payments) return [] as number[];
		const date = new Date();
		const data = [] as number[];

		if (filter.type == 'week') {
			for (let i = 0; i < 7; i++) {
				const dateActual = new Date(
					date.getFullYear(),
					date.getMonth(),
					date.getDate() - i
				);
				const completedPayment = payments.filter(
					pay =>
						pay.state == '2' &&
						checkDateIsCorrect(
							formatDateTime(new Date(pay.bookingDate)),
							dateActual
						)
				);
				if (!completedPayment) return [] as number[];
				const accum = completedPayment.reduce(
					(sum, pay) => sum + Number(pay.price),
					0
				);
				data.push(accum);
			}
			return data.reverse();
		}
		if (filter.type == 'month') {
			for (let i = 1; i <= MonthsDays[date.getMonth()]; i++) {
				const dateActual = new Date(date.getFullYear(), date.getMonth(), i);
				const completedPayment = payments.filter(
					pay =>
						pay.state == '2' &&
						checkDateIsCorrect(
							formatDateTime(new Date(pay.bookingDate)),
							dateActual
						)
				);
				if (!completedPayment) return [] as number[];
				const accum = completedPayment.reduce(
					(sum, pay) => sum + Number(pay.price),
					0
				);
				data.push(accum);
			}
		}
		if (filter.type == 'year') {
			for (let i = 0; i < 12; i++) {
				const dateActual = new Date(date.getFullYear(), i);
				const completedPayment = payments.filter(
					pay =>
						pay.state == '2' &&
						checkMonthIsCorrect(
							formatDateTime(new Date(pay.bookingDate)),
							dateActual
						)
				);
				if (!completedPayment) return [] as number[];
				const accum = completedPayment.reduce(
					(sum, pay) => sum + Number(pay.price),
					0
				);
				data.push(accum);
			}
		}
		return data;
	}, [filter.type, payments]);

	const calculateUsersData = useCallback(() => {
		if (!users) return [] as number[];
		const date = new Date();
		const data = [] as number[];

		if (filter.type == 'week') {
			for (let i = 0; i < 7; i++) {
				const dateActual = new Date(
					date.getFullYear(),
					date.getMonth(),
					date.getDate() - i
				);
				const usersInDate = users.filter(user =>
					checkDateIsCorrect(user.created_at, dateActual)
				);
				if (!usersInDate) return [] as number[];
				const accum = usersInDate.length;
				data.push(accum);
			}
			return data.reverse();
		}
		if (filter.type == 'month') {
			for (let i = 1; i <= MonthsDays[date.getMonth()]; i++) {
				const dateActual = new Date(date.getFullYear(), date.getMonth(), i);
				const usersInDate = users.filter(user =>
					checkDateIsCorrect(user.created_at, dateActual)
				);
				if (!usersInDate) return [] as number[];
				const accum = usersInDate.length;
				data.push(accum);
			}
		}
		if (filter.type == 'year') {
			for (let i = 0; i < 12; i++) {
				const dateActual = new Date(date.getFullYear(), i);
				const usersInDate = users.filter(user =>
					checkMonthIsCorrect(user.created_at, dateActual)
				);
				if (!usersInDate) return [] as number[];
				const accum = usersInDate.length;
				data.push(accum);
			}
		}
		return data;
	}, [filter.type, users]);

	const calculateProductSelledData = useCallback(() => {
		if (!purchases || !products)
			return [] as { name: string; data: number[] }[];
		const date = new Date();
		const data = [] as { name: string; data: number[] }[];

		if (filter.type == 'week') {
			products.forEach(prod => {
				const pdata = [] as number[];
				for (let i = 0; i < 7; i++) {
					const dateActual = new Date(
						date.getFullYear(),
						date.getMonth(),
						date.getDate() - i
					);
					const productsInDate = purchases.filter(
						p =>
							checkDateIsCorrect(p.purchased_at, dateActual) &&
							p.productId == prod.id
					);

					const accum = productsInDate.length;
					pdata.push(accum);
				}
				data.push({ name: prod.title, data: pdata.reverse() });
			});
			return data.reverse();
		}
		if (filter.type == 'month') {
			products.forEach(prod => {
				const pdata = [] as number[];
				for (let i = 1; i <= MonthsDays[date.getMonth()]; i++) {
					const dateActual = new Date(date.getFullYear(), date.getMonth(), i);
					const productsInDate = purchases.filter(
						p =>
							checkDateIsCorrect(p.purchased_at, dateActual) &&
							p.productId == prod.id
					);

					const accum = productsInDate.length;
					pdata.push(accum);
				}
				data.push({ name: prod.title, data: pdata });
			});
		}
		if (filter.type == 'year') {
			products.forEach(prod => {
				const pdata = [] as number[];
				for (let i = 0; i < 12; i++) {
					const dateActual = new Date(date.getFullYear(), i);
					const productsInDate = purchases.filter(
						p =>
							checkMonthIsCorrect(p.purchased_at, dateActual) &&
							p.productId == prod.id
					);

					const accum = productsInDate.length;
					pdata.push(accum);
				}
				data.push({ name: prod.title, data: pdata });
			});
		}
		return data;
	}, [filter.type, products, purchases]);

	const calculateAllProductSellsData = useCallback(() => {
		if (!purchases || !products)
			return { data: [], prodNames: [] } as {
				data: number[];
				prodNames: string[];
			};

		const data = [] as number[];
		const prods = [] as string[];

		products.forEach(prod => {
			const prodsFiltered = purchases.filter(p => p.productId == prod.id);

			data.push(prodsFiltered.length);
			prods.push(prod.title);
		});
		return { data: data.reverse(), prodNames: prods.reverse() };
	}, [filter.type, products, purchases]);

	const calculateTotalSells = useCallback(() => {
		if (!payments) return 0;
		const completed = payments.filter(p => p.state == '2');
		return completed.length;
	}, [filter.type, payments]);

	const calculateTotalSellsToday = useCallback(() => {
		if (!payments) return 0;
		const completed = payments.filter(
			p =>
				p.state == '2' &&
				checkDateIsCorrect(formatDateTime(new Date(p.bookingDate)), new Date())
		);
		return completed.length;
	}, [filter.type, payments]);

	const calculateTotalSellsMonth = useCallback(() => {
		if (!payments) return 0;
		const completed = payments.filter(
			p =>
				p.state == '2' &&
				checkMonthIsCorrect(formatDateTime(new Date(p.bookingDate)), new Date())
		);
		return completed.length;
	}, [filter.type, payments]);

	useEffect(() => {
		setGains(calculateGainsData());
		setUsersCreated(calculateUsersData());
		setProductsSelled(calculateProductSelledData());
		setDatesByFilter(getDateByFilter());
		const allP = calculateAllProductSellsData() as {
			data: number[];
			prodNames: string[];
		};
		setTotalProductSells(allP.data);
		setTotalProductSellsN(allP.prodNames);
		setTotalSells(calculateTotalSells());
		setTotalSellsToday(calculateTotalSellsToday());
		setTotalSellsMonth(calculateTotalSellsMonth());
	}, [products, purchases, users, filter]);

	return (
		<>
			<div className='min-w-0 w-full p-3 lg:p-6 pt-14 flex flex-col items-center gap-4 overflow-x-hidden overflow-y-visible'>
				<div className=' w-full max-w-[1320px] flex flex-col items-center gap-4'>
					<div className='w-full flex '>
						<div className='bg-white p-2 rounded-md shadow items-center justify-center'>
							<select
								name='filter'
								id='filter'
								value={filter.type}
								onChange={e => {
									const newState = { ...filter, type: e.target.value };
									setFilter(newState);
									setGains([]);
									setUsersCreated([]);
									setProductsSelled([]);
									setDatesByFilter([]);
								}}
								className='focus:outline-0 px-3 py-1'
							>
								<option value='week'>1 week ago</option>
								<option value='month'>this month</option>
								<option value='year'>this year</option>
							</select>
						</div>
					</div>
					<div className='flex items-center w-full justify-between'>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full'>
							<MetricCard
								title='Ventas Acumuladas'
								subtitle='Total de transacciones'
								icon={CircleDollarSignIcon}
								color='#2563eb'
								value={totalSells}
							></MetricCard>
							<MetricCard
								title='Ventas del Día'
								subtitle='Transacciones hoy'
								icon={Coins}
								color='#f97316'
								value={totalSellsToday}
							></MetricCard>
							<MetricCard
								title='Ventas Mensuales'
								subtitle='Transacciones este mes'
								icon={CalendarDaysIcon}
								color='#9333ea'
								value={totalSellsMonth}
							></MetricCard>
							<MetricCard
								title='Productos Activos'
								subtitle='Inventario disponible'
								icon={Package}
								color='#16a34a'
								value={products ? products.length : 0}
							></MetricCard>
						</div>
					</div>
					<div className='flex flex-col lg:flex-row gap-4 items-center w-full justify-between'>
						<div className='flex items-center justify-center p-2 pt-4 w-full lg:w-[50%] bg-white rounded-md shadow-md'>
							{gains.length > 0 && datesByFilter.length > 0 ? (
								<LineChart
									title='Ganancias'
									dataLabels={filter.type != 'month'}
									name='Ganancia'
									data={gains}
									days={datesByFilter}
								></LineChart>
							) : (
								<div className='w-full h-32 flex justify-center items-center text-2xl gap-4'>
									<CircleDashed className='h-10 w-10 loader'></CircleDashed>
									<p>Analizando ganancias...</p>
								</div>
							)}
						</div>
						<div className='flex items-center justify-center p-2 pt-4 w-full lg:w-[50%] bg-white rounded-md shadow-md'>
							{usersCreated.length > 0 && datesByFilter.length > 0 ? (
								<LineChart
									dataLabels={filter.type != 'month'}
									title='Usuarios creados'
									name='Usuarios creados'
									data={usersCreated}
									days={datesByFilter}
								></LineChart>
							) : (
								<div className='w-full h-32 flex justify-center items-center text-2xl gap-4'>
									<CircleDashed className='h-10 w-10 loader'></CircleDashed>
									<p>Analizando usuarios creados...</p>
								</div>
							)}
						</div>
					</div>
					<div className='flex flex-col lg:flex-row gap-4 items-center w-full justify-between'>
						<div className='flex items-center justify-center p-2 pl-0 pr-4 w-full lg:w-[50%] bg-white rounded-md shadow-md'>
							{totalProductSells.length > 0 && totalProductSellsN.length > 0 ? (
								<HorizontalChart
									title='Total de ventas por producto'
									data={totalProductSells}
									categorys={totalProductSellsN}
								></HorizontalChart>
							) : (
								<div className='w-full h-32 flex justify-center items-center text-2xl gap-4'>
									<CircleDashed className='h-10 w-10 loader'></CircleDashed>
									<p>Analizando total de productos vendidos...</p>
								</div>
							)}
						</div>
						<div className='flex items-center justify-center p-2 pr-0 w-full lg:w-[50%] bg-white rounded-md shadow-md'>
							{productsSelled.length > 0 && datesByFilter.length > 0 ? (
								<StackedBarChart
									title='Productos vendidos por dia'
									days={datesByFilter}
									data={productsSelled}
								></StackedBarChart>
							) : (
								<div className='w-full h-32 flex justify-center items-center text-2xl gap-4'>
									<CircleDashed className='h-10 w-10 loader'></CircleDashed>
									<p>Analizando productos comprados...</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
