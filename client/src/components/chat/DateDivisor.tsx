export function DateDivisor({ dateS }: { dateS: string }) {
	const date = new Date(dateS + ' UTC');
	return (
		<div className={`relative my-2 flex w-full justify-center items-center`}>
			<div className='border-b w-[80%] absolute border-[--light_300]'></div>
			<p className='bg-[--light_700] z-10 text-sm px-4 text-[--light_200]'>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</p>
		</div>
	);
}
