/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Preferences, ProgressDataI, PurchasedProduct } from '../types';
import { IMG_API_URL, LANGUAGE } from '../consts';
import { createDateTextFromLanguage } from '../utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Image, RefreshCw, X } from 'lucide-react';
import { useDownload } from '../context/download.context';
import { ImageLoading } from './Elements/ImageLoading';
import { ImageUnavaliable } from './Elements/ImageUnavalilable';

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
	const [imageFailed, setImageFailed] = useState(false);

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
		<div className='bg-[--light_900] hover:shadow-md hover:-translate-y-1 transition-[box-shadow,transform] rounded-xl p-4'>
			<div className='aspect-video w-full rounded-lg relative overflow-hidden'>
				<ImageLoading loading={!imageFailed}>
					<Image className='w-36 h-36 text-[--light_600]' />
				</ImageLoading>
				<img
					src={`${IMG_API_URL}${product.image}.webp`}
					alt={product.title}
					draggable={false}
					onError={e => {
						const img = e.target as HTMLImageElement;
						setImageFailed(true);
						img.onerror = null;
					}}
					className={`w-full h-full object-cover z-10 text-[--light_0] bg-[--bg_prim] ${
						imageFailed ? 'hidden' : 'flex'
					}`}
				/>
				<ImageUnavaliable show={imageFailed} />
			</div>
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
				<div className='mt-4 h-fit flex w-full rounded-lg gap-1'>
					<div className='w-full h-fit rounded-lg flex flex-col gap-1'>
						<div className='w-full h-9 bg-[--light_400] overflow-hidden rounded-2xl'>
							<div
								className='bg-[--button_purchased] transition-[width] max-w-full flex items-center justify-end h-9 rounded-2xl'
								style={{
									width: `${downloadData ? downloadData.progress : 0}%`,
								}}
							>
								<span
									className={`text-lg font-medium text-[--light_100] ${
										downloadData
											? downloadData.progress > 10
												? 'mr-3'
												: '-mr-8'
											: 'mr-3'
									}`}
								>
									{`${downloadData ? downloadData.progress : 0}%`}
								</span>
							</div>
						</div>
						<div className='w-full flex flex-col sm:flex-row items-start justify-between text-[--light_200] sm:items-center px-1 h-fit text-sm font-medium'>
							<div className='flex items-center justify-center gap-2'>
								<p className=''>
									{LANGUAGE.DASHBOARD.SPEED[preferences.language]}:{' '}
									<span className='text-[--light_100]'>{velocity()}</span>
								</p>
								<span>-</span>
								<p className=''>
									{LANGUAGE.DASHBOARD.ESTTIME[preferences.language]}:{' '}
									<span className='text-[--light_100]'>{estimatedTime()}</span>
								</p>
							</div>
							<p className=''>
								{loaded()} / {total()}
							</p>
						</div>
					</div>
					<div
						className='h-9 w-9 p-1 flex items-center justify-end cursor-pointer transition-colors hover:bg-[--light_600] border border-transparent hover:border-[--light_500] rounded-full'
						onClick={handleCancel}
					>
						<X className='text-[--light_100]'></X>
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
