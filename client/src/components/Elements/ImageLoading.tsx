import { ReactNode } from 'react';

export function ImageLoading({
	loading,
	className,
	children,
}: {
	loading: boolean;
	className?: string;
	children?: ReactNode;
}) {
	return (
		<div
			className={`w-full h-full absolute top-0 left-0 flex items-center justify-center z-0 ${className} ${
				loading ? 'flex bg-loader' : 'hidden'
			}`}
		>
			{children}
		</div>
	);
}
