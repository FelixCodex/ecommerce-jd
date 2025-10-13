import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export function LineChart({
	title,
	name,
	data,
	days,
	dataLabels,
}: {
	title: string;
	name: string;
	data: number[];
	days: string[];
	dataLabels: boolean;
}) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [state, setState] = useState({
		series: [
			{
				name: name,
				data: data,
			},
		],
		options: {
			chart: {
				type: 'line',
				zoom: {
					enabled: false,
				},
			},
			// responsive: [
			// 	{
			// 		breakpoint: 768,
			// 		options: {
			// 			chart: {
			// 				width: '90%',
			// 			},
			// 		},
			// 	},
			// 	{
			// 		breakpoint: 1024,
			// 		options: {
			// 			chart: {
			// 				width: '70%',
			// 			},
			// 		},
			// 	},
			// ],
			dataLabels: {
				enabled: dataLabels,
			},
			stroke: {
				curve: 'straight',
			},
			title: {
				text: title,
				align: 'left',
			},
			grid: {
				row: {
					colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
					opacity: 0.5,
				},
			},
			xaxis: {
				categories: days,
			},
		},
	});

	return (
		<div className='w-full flex flex-col items-center justify-center'>
			<div
				id='chart'
				className='w-full'
			>
				<ReactApexChart
					options={state.options as ApexOptions}
					series={state.series}
					type='line'
				/>
			</div>
			<div id='html-dist'></div>
		</div>
	);
}
