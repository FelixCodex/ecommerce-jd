import { axiosPostRequest, AxiosReturn } from './axios.ts';

export const paymentLinkRequest = async (): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/qvapay/paymentlink`);
};
