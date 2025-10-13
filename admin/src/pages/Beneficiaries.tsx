import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useBeneficiary } from '../hooks/useBeneficiary';
import { BeneficiaryCard } from '../components/BeneficiaryCard';
import { CreateBeneficiaryDialog } from '../components/CreateBeneficiaryDialog';

export function Beneficiarys() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { beneficiarys, addBeneficiary } = useBeneficiary();

	return (
		<>
			<div className='w-full p-10  mt-3 max-w-[1330px] flex flex-col gap-4 items-center'>
				<div className='w-full flex justify-end'>
					<button
						className='bg-green-50 rounded-lg shadow hover:scale-[105%] transition-[scale] flex w-fit p-4 px-5 gap-2 justify-center items-center'
						onClick={() => setIsDialogOpen(true)}
					>
						<p className='text-xl text-green-500'>Add Beneficiary</p>
						<Plus className='text-green-500'></Plus>
					</button>
				</div>
				{beneficiarys &&
					(beneficiarys.length > 0 ? (
						beneficiarys.map(b => {
							return (
								<>
									<BeneficiaryCard beneficiary={b}></BeneficiaryCard>
								</>
							);
						})
					) : (
						<p className='text-2xl'>There are no beneficiarys</p>
					))}
			</div>
			<CreateBeneficiaryDialog
				isOpen={isDialogOpen}
				setIsOpen={setIsDialogOpen}
				addNewBeneficiary={addBeneficiary}
			></CreateBeneficiaryDialog>
		</>
	);
}
