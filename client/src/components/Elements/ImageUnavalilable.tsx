import { ImageOff } from 'lucide-react';
import { usePreferences } from '../../hooks/usePreferences';
import { LANGUAGE } from '../../consts';

export function ImageUnavaliable({ show }: { show: boolean }) {
	const { preferences } = usePreferences();
	const language = preferences.language;
	return (
		<div
			className={`bg-[--light_700] relative z-10 overflow-hidden w-full h-full flex flex-col items-center gap-4 justify-center ${
				show ? 'flex' : 'hidden'
			}`}
		>
			<ImageOff className='w-36 h-36 text-[--light_500] z-10' />
			<span className='text-[--light_400] font-bold text-3xl z-10'>
				{LANGUAGE.PRODUCT.IMAGE_UNAVAILABLE[language]}
			</span>
		</div>
	);
}
