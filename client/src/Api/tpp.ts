import { License } from '../types/index.ts';
import { axiosPostRequest, AxiosReturn } from './axios.ts';

export const paymentLinkRequest = async (data: {
	name: string;
	lastName: string;
	phoneNumber: string;
	address: string;
	country: number;
	city: string;
	postalCode: string;
}): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/tpp/paymentlink`, data);
};

export const quickPaymentLinkRequest = async (data: {
	name: string;
	lastName: string;
	phoneNumber: string;
	address: string;
	country: number;
	city: string;
	postalCode: string;
	productId: string;
	license: License;
}): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/tpp/quickpaymentlink`, data);
};
