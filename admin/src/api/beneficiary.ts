import { axiosGetRequest, axiosPostRequest, AxiosReturn } from './axios.ts';

export const getAllBeneficiarysRequest = async () => {
	return await axiosGetRequest(`/beneficiaries`);
};

export const deleteBeneficiaryRequest = async ({
	id,
}: {
	id: string;
}): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/beneficiary/delete`, { id });
};

export const payBeneficiaryRequest = async ({
	id,
}: {
	id: string;
}): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/beneficiary/pay`, { id });
};

export const createBeneficiarysRequest = async ({
	name,
	ratingBeforeMax,
	ratingAfterMax,
	max,
}: {
	name: string;
	ratingBeforeMax: number;
	ratingAfterMax: number;
	max: number;
}): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/beneficiary/create`, {
		name,
		ratingBeforeMax,
		ratingAfterMax,
		max,
	});
};
