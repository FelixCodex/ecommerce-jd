import { LucideIcon } from 'lucide-react';

export function Badge({ title, value }: { title: string; value: number }) {
	return (
		<div
			className={`flex w-52 h-36 p-8 flex-col justify-center items-center gap-4 border-2 border-gray-300 rounded-xl`}
		>
			<p
				className='text-xl font-[600] text-blue-500'
				style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
				font-family='Helvetica, Arial, sans-serif'
			>
				{title}
			</p>
			<p
				className='text-xl font-[400] text-gray-800'
				style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
				font-family='Helvetica, Arial, sans-serif'
			>
				{value}
			</p>
		</div>
	);
}

export function MetricCard({
	icon: Icon,
	title,
	value,
	subtitle,
	trend,
	color,
}: {
	icon: LucideIcon;
	title: string;
	value: number;
	subtitle?: string;
	trend?: number;
	color: string;
}) {
	return (
		<div className='bg-white p-4 w-full rounded-lg border border-gray-200 shadow-sm'>
			<div className='flex items-center justify-between gap-3'>
				<div
					className={`p-2 rounded-lg lighterDarkerElement`}
					style={{ '--color': color } as React.CSSProperties}
				>
					<Icon size={20} />
				</div>
				<div className='flex w-full flex-col items-start justify-start'>
					<p className='text-sm text-gray-600'>{title}</p>
					<p className='text-2xl font-bold text-gray-900'>{value}</p>
					{subtitle && <p className='text-xs text-gray-500'>{subtitle}</p>}
				</div>
				{trend && (
					<div
						className={`text-sm font-medium ${
							trend > 0 ? 'text-green-600' : 'text-red-600'
						}`}
					>
						{trend > 0 ? '+' : ''}
						{trend}%
					</div>
				)}
			</div>
		</div>
	);
}
