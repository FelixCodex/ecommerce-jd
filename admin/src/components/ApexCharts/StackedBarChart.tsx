import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export function StackedBarChart({
	title,
	data,
	days,
}: {
	title: string;
	data: { name: string; data: number[] }[];
	days: string[];
}) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [state, setState] = useState({
		series: data,
		options: {
			chart: {
				type: 'bar',
				stacked: true,
				toolbar: {
					show: true,
				},
				zoom: {
					enabled: false,
				},
			},
			// responsive: [
			//   {
			//     breakpoint: 480,
			//     options: {
			//       legend: {
			//         position: "bottom",
			//         offsetX: -10,
			//         offsetY: 0,
			//       },
			//     },
			//   },
			// ],
			plotOptions: {
				bar: {
					horizontal: false,
					borderRadius: 10,
					borderRadiusApplication: 'end', // 'around', 'end'
					borderRadiusWhenStacked: 'last', // 'all', 'last'
					dataLabels: {
						total: {
							enabled: true,
							style: {
								fontSize: '13px',
								fontWeight: 900,
							},
						},
					},
				},
			},
			title: {
				text: title,
				align: 'left',
			},
			xaxis: {
				categories: days,
			},
			legend: {
				position: 'right',
				offsetY: 40,
			},
			fill: {
				opacity: 1,
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
