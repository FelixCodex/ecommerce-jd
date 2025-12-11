export function EllipsisAnimated({ className }: { className?: string }) {
	return (
		<>
			<span
				className={`ping-delay-1 w-[4px] mb-[5px] rounded-full h-[4px] bg-[--light_200] ${className}`}
			></span>
			<span
				className={`ping-delay-2 w-[4px] mb-[5px] rounded-full h-[4px] bg-[--light_200] ${className}`}
			></span>
			<span
				className={`ping-delay-3 w-[4px] mb-[5px] rounded-full h-[4px] bg-[--light_200] ${className}`}
			></span>
		</>
	);
}
