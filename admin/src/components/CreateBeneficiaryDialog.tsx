import { FormEvent, useState } from 'react';
import { createBeneficiarysRequest } from '../api/beneficiary';
import { NewBeneficiary } from '../types';
import { CircleDashed } from 'lucide-react';

export function CreateBeneficiaryDialog({
	isOpen,
	setIsOpen,
	addNewBeneficiary,
}: {
	isOpen: boolean;
	setIsOpen: (bool: boolean) => void;
	addNewBeneficiary: ({
		name,
		ratingBeforeMax,
		ratingAfterMax,
		max,
	}: NewBeneficiary) => void;
}) {
	const [loadingSubmit, setLoadingSubmit] = useState(false);
	const [name, setName] = useState('');
	const [ratingBeforeMax, setRatingBeforeMax] = useState(0);
	const [ratingAfterMax, setRatingAfterMax] = useState(0);
	const [max, setMax] = useState(0);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!loadingSubmit) {
			setLoadingSubmit(true);
			try {
				const res = await createBeneficiarysRequest({
					name,
					ratingBeforeMax,
					ratingAfterMax,
					max,
				});
				if (res.status == 200) {
					addNewBeneficiary({
						id: res.data.id,
						name,
						ratingBeforeMax,
						ratingAfterMax,
						max,
					});
					setName('');
					setRatingBeforeMax(0);
					setRatingAfterMax(0);
					setMax(0);
					setIsOpen(false);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoadingSubmit(false);
			}
		}
	};

	return (
		<div
			className={`${
				isOpen ? 'absolute' : 'hidden'
			} w-screen z-40 h-screen top-0 left-0 bg-[#0202025d]`}
			onMouseDown={() => setIsOpen(false)}
		>
			<div className='flex justify-center items-center w-full h-full'>
				<div
					className='bg-white w-lg h-[420px] rounded-lg shadow flex flex-col p-4 '
					onMouseDown={e => e.stopPropagation()}
				>
					<form
						className='flex flex-col items-start w-full'
						onSubmit={handleSubmit}
					>
						<label
							htmlFor='name'
							className='text-md text-gray-500 '
						>
							Name
						</label>
						<input
							id='name'
							name='name'
							type='text'
							value={name}
							onChange={e => setName(e.target.value)}
							required
							className={`mb-2 appearance-none text-md h-12 my-1 rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10`}
						/>

						<label
							htmlFor='ratingBeforeMax'
							className='text-md text-gray-500 '
						>
							Rating Before Max
						</label>
						<input
							id='ratingBeforeMax'
							name='ratingBeforeMax'
							type='number'
							value={ratingBeforeMax}
							onChange={e => setRatingBeforeMax(Number(e.target.value))}
							required
							className={`mb-2 appearance-none text-md h-12 my-1 rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10`}
						/>

						<label
							htmlFor='ratingAfterMax'
							className='text-md text-gray-500 '
						>
							Rating After Max
						</label>
						<input
							id='ratingAfterMax'
							name='ratingAfterMax'
							type='number'
							value={ratingAfterMax}
							onChange={e => setRatingAfterMax(Number(e.target.value))}
							required
							className={`mb-2 appearance-none text-md h-12 my-1 rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10`}
						/>

						<label
							htmlFor='max'
							className='text-md text-gray-500 '
						>
							Max
						</label>
						<input
							id='max'
							name='max'
							type='number'
							value={max}
							onChange={e => setMax(Number(e.target.value))}
							required
							className={`mb-3 appearance-none text-md h-12 my-1 rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10`}
						/>
						<button
							type='submit'
							disabled={loadingSubmit}
							className={`group h-12 relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
						>
							{loadingSubmit ? (
								<CircleDashed className='h-5 w-5 loader'></CircleDashed>
							) : (
								<span>Crearte Beneficiary</span>
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
