import { useId } from 'react';

export function Loading() {
	return (
		<div className='flex items-center justify-center w-screen h-screen bg-[--bg_prim]'>
			<div className='flex-col gap-4 w-full flex items-center justify-center'>
				<div className='absolute w-[90px] h-[90px] animate-ping bg-indigo-500 rounded-full flex items-center justify-center'>
					<div className='w-20 h-20 bg-white rounded-full'></div>
				</div>
				<SparkleGradient
					width={80}
					height={80}
					className='loader'
				/>
			</div>
		</div>
	);
}

export function SparkleGradient({
	width = 25,
	height = 25,
	strokeWidth = 2,
	className,
}: {
	width?: number;
	height?: number;
	strokeWidth?: number;
	className?: string;
}) {
	const gradientId = useId();
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill='none'
			stroke={`url(#${gradientId})`}
			strokeWidth={strokeWidth}
			strokeLinecap='round'
			strokeLinejoin='round'
			className={`rounded-full bg-gray-95 bg-transparent ${className}`}
		>
			<defs>
				<linearGradient
					id={gradientId}
					x1='0%'
					y1='0%'
					x2='100%'
					y2='100%'
				>
					<stop
						offset='0%'
						stopColor='oklch(0.585 0.233 277.117)'
					/>
					<stop
						offset='50%'
						stopColor='oklch(0.627 0.265 303.9)'
					/>
					<stop
						offset='100%'
						stopColor='oklch(0.667 0.295 322.15)'
					/>
				</linearGradient>
			</defs>
			<path d='m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z' />
		</svg>
	);
}
