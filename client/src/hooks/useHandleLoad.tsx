import { useUtils } from '../context/utils.context';

export function useHandleLoad() {
	const { setIsLoading } = useUtils();

	const handleLoad = () => {
		setIsLoading(false);
	};
	return { handleLoad };
}
