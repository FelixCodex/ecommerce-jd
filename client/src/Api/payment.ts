import { axiosGetRequest, axiosPostRequest, AxiosReturn } from './axios.ts';

export const getPurchasedRequest = async (): Promise<AxiosReturn> => {
	return await axiosGetRequest(`/purchases`);
};

export const getRateRequest = async (): Promise<AxiosReturn> => {
	return await axiosGetRequest(`/rate`);
};

export const getPaymentRequest = async (
	reference: string
): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/paymentui`, { id: reference });
};
