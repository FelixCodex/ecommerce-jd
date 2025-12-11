export function XTiny({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			fill='none'
			viewBox='0 0 12 12'
		>
			<path
				d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
				stroke='currentColor'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}
