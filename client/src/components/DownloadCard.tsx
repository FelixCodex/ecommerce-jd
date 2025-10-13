import { useCallback, useId } from 'react';
import { SpeedMeter } from './Elements/SpeedMeter';
import { Clock, X } from 'lucide-react';

const gb = 1000000000;
const mb = 1000000;
const kb = 1000;
const h = 3600;
const m = 60;

export function DownloadCard({
	id,
	title,
	progress,
	speed,
	estTime,
	loaded,
	total,
	controller,
}: {
	id: string;
	title: string;
	progress: number;
	speed: number;
	estTime: number;
	loaded: number;
	total: number;
	controller: AbortController;
}) {
	const rid = useId();

	const estimatedTime = useCallback(() => {
		const et = estTime;
		return `${(et > m ? (et > h ? et / h : et / m) : et).toFixed(0)}${
			et > m ? (et > h ? 'h' : 'm') : 's'
		}`;
	}, [estTime]);

	const velocity = useCallback(() => {
		const s = speed;
		return `${(s > kb ? (s > mb ? s / mb : s / kb) : s).toFixed(2)}${
			s > kb ? (s > mb ? 'MB' : 'KB') : 'B'
		}/s`;
	}, [speed]);

	const loadedData = useCallback(() => {
		return `${(loaded > gb ? loaded / gb : loaded / mb).toFixed(2)}${
			loaded > gb ? 'GB' : 'MB'
		}`;
	}, [loaded]);

	const totalData = useCallback(() => {
		return `${(total > gb ? total / gb : total / mb).toFixed(2)}${
			total > gb ? 'GB' : 'MB'
		}`;
	}, [total]);

	return (
		<div
			id={rid}
			key={rid + '-' + id}
			className='flex flex-col w-full gap-1 p-2 hover:shadow-md transition-[box-shadow] border bg-[--bg_thir] border-[--button_not_allowed] rounded-xl'
		>
			<div className='flex justify-between items-center text-[--light_50]'>
				<p className='text-md font-medium'>{title}</p>
				<p className='text-sm font-medium'>
					{loadedData()}/{totalData()}
				</p>
			</div>
			<div className='flex justify-between items-center text-[--light_100]'>
				<p className='font-medium'>{progress}%</p>
				<div className='flex items-center justify-center gap-1 '>
					<SpeedMeter className='w-5 h-5'></SpeedMeter>
					<p className='text-sm font-medium'>{velocity()}</p>|
					<Clock className='w-5 h-5 '></Clock>
					<p className='text-sm font-medium'>{estimatedTime()}</p>
				</div>
			</div>
			<div className='flex gap-2 items-center justify-between'>
				<div className='w-full h-3 bg-[--light_500] overflow-hidden rounded-full'>
					<div
						className='h-full bg-[--button_purchased] transition-[width] rounded-full'
						style={{ width: `${progress}%` }}
					></div>
				</div>
				<button
					className='p-1 text-[--light_200] rounded-full border border-transparent hover:shadow-md hover:hover:bg-[--bg_sec] hover:hover:border-[--light_400]'
					onClick={() => {
						controller?.abort();
					}}
				>
					<X className='h-5 w-5'></X>
				</button>
			</div>
		</div>
	);
}
