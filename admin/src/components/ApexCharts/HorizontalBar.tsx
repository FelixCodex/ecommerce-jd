import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export function HorizontalChart({
	title,
	data,
	categorys,
}: {
	title: string;
	data: number[];
	categorys: string[];
}) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [state, setState] = useState({
		series: [
			{
				data: data,
			},
		],
		options: {
			chart: {
				type: 'bar',
			},
			plotOptions: {
				bar: {
					borderRadius: 4,
					borderRadiusApplication: 'end',
					horizontal: true,
				},
			},
			title: {
				text: title,
				align: 'left',
			},
			dataLabels: {
				enabled: false,
			},
			xaxis: {
				categories: categorys,
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
					type='bar'
				/>
			</div>
			<div id='html-dist'></div>
		</div>
	);
}
