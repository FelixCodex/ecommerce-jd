import { Download, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LANGUAGE } from '../consts';
import { usePreferences } from '../hooks/usePreferences';
import { useDownload } from '../context/download.context';
import { DownloadCard } from './DownloadCard';

export function DownloadNav({ className }: { className?: string }) {
	const { progressData } = useDownload();
	const [isOpen, setIsOpen] = useState(true);
	const { preferences } = usePreferences();

	useEffect(() => {
		if (progressData.length == 0) {
			setIsOpen(false);
		}
	}, [progressData]);

	return (
		<nav
			className={`${className} w-full fixed justify-end transition-[margin] duration-300 px-4 pt-3 items-center ${
				progressData.length > 0 ? 'flex' : 'hidden'
			}`}
		>
			<div className='h-fit w-full relative md:w-72 flex flex-col justify-center items-end'>
				<button
					className={`rounded-full p-3 bg-[--button] relative hover:bg-[--button_hover]`}
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				>
					<Download className='w-5 h-5 text-[--light_900]'></Download>
					<div className='absolute -bottom-2 -left-2 select-none min-w-6 w-fit h-6 flex justify-center items-center bg-[--brand_color] border border-[--bg_prim] p-1 rounded-full'>
						<p className='text-[--light_800] text-xs'>{progressData.length}</p>
					</div>
				</button>
				<div
					className={`w-full h-fit rounded-xl bg-[--bg_sec] border border-[--light_500] absolute top-0 transition-transform duration-300 ${
						isOpen ? 'translate-x-0' : 'translate-x-[120%]'
					}`}
				>
					<div className='w-full flex justify-between items-center border-b border-[--light_500] p-2'>
						<p className='text-lg font-medium pl-1 text-[--light_50]'>
							{LANGUAGE.DASHBOARD.DOWNLOADS[preferences.language]} (
							{progressData.length})
						</p>
						<button
							className=' p-1 text-[--light_50] rounded-full border border-transparent hover:shadow-md hover:bg-[--bg_thir] hover:bg-[--light_40'
							onClick={() => {
								setIsOpen(!isOpen);
							}}
						>
							<X className='h-7 w-7'></X>
						</button>
					</div>
					<div className='w-full flex flex-col gap-2 max-h-96 overflow-auto items-center p-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[--light_400] [&::-webkit-scrollbar-thumb]:rounded-md'>
						{progressData.map(el => {
							return <DownloadCard {...el}></DownloadCard>;
						})}
					</div>
				</div>
			</div>
		</nav>
	);
}
