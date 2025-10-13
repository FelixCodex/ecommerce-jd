/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Preferences, ProgressDataI, PurchasedProduct } from '../types';
import { IMG_API_URL, LANGUAGE } from '../consts';
import { createDateTextFromLanguage } from '../utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshCw, X } from 'lucide-react';
import { useDownload } from '../context/download.context';

interface ProductCardProps {
	product: PurchasedProduct;
	preferences: Preferences;
}

export function PurchasedProductCard({
	product,
	preferences,
}: ProductCardProps) {
	const date = new Date(product.purchased_at);
	const { progressData, startDownload } = useDownload();
	const [isDownloading, setIsDownloading] = useState(false);
	const [downloadData, setDownloadData] = useState<ProgressDataI | null>(null);
	const [error, setError] = useState<string | null>(null);
	const controller = useRef<AbortController | null>(null);

	const handleDownload = async () => {
		setIsDownloading(true);
		setError(null);
		controller.current = new AbortController();
		try {
			startDownload(product.id, product.title, controller.current, () => {
				setIsDownloading(false);
			});
		} catch (err: any) {
			if (err.name === 'AbortError' || err.name === 'CanceledError') return;
			console.error(err);
			setError('Something went wrong');
			setIsDownloading(false);
		}
	};

	const handleCancel = () => {
		controller.current?.abort();
		setDataToDefault();
	};

	const setDataToDefault = () => {
		setIsDownloading(false);
	};

	useEffect(() => {
		const download = progressData.find(el => el.id == product.id);
		if (download) {
			setDownloadData(download);
			setIsDownloading(true);
		} else {
			setIsDownloading(false);
		}
	}, [progressData, product.id]);

	const estimatedTime = useCallback(() => {
		const data = downloadData?.estTime;
		if (!data) return '0s';
		return `${(data > 60
			? data > 3600
				? data / 3600
				: data / 60
			: data
		).toFixed(0)}${data > 60 ? (data > 3600 ? 'h' : 'm') : 's'}`;
	}, [downloadData]);

	const velocity = useCallback(() => {
		const data = downloadData?.speed;
		if (!data) return '0B/s';
		return `${(data > 1000
			? data > 1000000
				? data / 1000000
				: data / 1000
			: data
		).toFixed(2)}${data > 1000 ? (data > 1000000 ? 'MB' : 'KB') : 'B'}/s`;
	}, [downloadData]);

	const loaded = useCallback(() => {
		const data = downloadData?.loaded;
		if (!data) return '0MB';
		return `${(data > 1000000000 ? data / 1000000000 : data / 1000000).toFixed(
			2
		)}${data > 1000000000 ? 'GB' : 'MB'}`;
	}, [downloadData]);

	const total = useCallback(() => {
		const data = downloadData?.total;
		if (!data) return '0MB';
		return `${(data > 1000000000 ? data / 1000000000 : data / 1000000).toFixed(
			2
		)}${data > 1000000000 ? 'GB' : 'MB'}`;
	}, [downloadData]);

	return (
		<div className='border border-[--light_400] hover:shadow-md transition-[box-shadow] rounded-lg p-4'>
			<img
				src={`${IMG_API_URL}${product.image}.webp`}
				alt={product.title}
				draggable={false}
				className='w-full h-72 object-cover rounded-lg aspect-auto text-[--light_0] bg-[--bg_prim]'
			/>
			<h3 className='mt-4 text-lg font-semibold text-[--light_0]'>
				{product.title}
			</h3>
			<p className='text-sm mt-1  text-[--light_0]'>{`${
				LANGUAGE.DASHBOARD.PURCHASED_AT[preferences.language]
			} ${createDateTextFromLanguage(preferences.language, date)}`}</p>
			{error ? (
				<button
					className='mt-4 w-full flex flex-wrap justify-center items-center gap-2 bg-red-300 hover:bg-red-400 border border-red-500  py-2 rounded-lg'
					disabled={isDownloading}
					onClick={handleDownload}
				>
					<span>{LANGUAGE.DASHBOARD.WRONG[preferences.language]}</span>
					<span className='flex gap-2 items-center justify-center'>
						{LANGUAGE.DASHBOARD.TRY[preferences.language]}
						<RefreshCw className='h-5 w-5'></RefreshCw>
					</span>
				</button>
			) : isDownloading ? (
				<div className='mt-4 h-fit flex w-full rounded-lg'>
					<div className='w-full h-[3.75rem] rounded-lg'>
						<div className='w-full h-10 bg-[--light_400] overflow-hidden rounded-lg'>
							<div
								className='bg-[--button_purchased] transition-[width] max-w-full flex items-center justify-end h-10 rounded-lg'
								style={{
									width: `${downloadData ? downloadData.progress : 0}%`,
								}}
							>
								<p
									className={`text-lg font-medium text-[--light_100] ${
										downloadData
											? downloadData.progress > 10
												? 'mr-3'
												: '-mr-8'
											: 'mr-3'
									}`}
								>
									{`${downloadData ? downloadData.progress : 0}%`}
								</p>
							</div>
						</div>
						<div className='w-full flex justify-between text-[--light_100] items-center px-1 h-5'>
							<div className='flex items-center justify-center gap-2'>
								<p className='text-sm font-medium'>
									{LANGUAGE.DASHBOARD.SPEED[preferences.language]}: {velocity()}
								</p>
								<p className='text-sm font-medium'>
									{LANGUAGE.DASHBOARD.ESTTIME[preferences.language]}:{' '}
									{estimatedTime()}
								</p>
							</div>
							<p className='text-sm font-medium'>
								{loaded()}/{total()}
							</p>
						</div>
					</div>
					<div className='w-10 flex items-center justify-end h-full'>
						<X
							className='h-10 w-10 p-1 transition-colors  hover:bg-[--light_500] border border-transparent hover:border-[--light_400] rounded-full'
							onClick={handleCancel}
						></X>
					</div>
				</div>
			) : (
				<button
					className='mt-4 w-full bg-[--button_purchased] text-[--light_900] py-2 rounded-lg hover:bg-[--button_purchased_hover]'
					disabled={isDownloading}
					onClick={handleDownload}
				>
					{LANGUAGE.DASHBOARD.DOWNLOAD[preferences.language]}
				</button>
			)}
		</div>
	);
}
