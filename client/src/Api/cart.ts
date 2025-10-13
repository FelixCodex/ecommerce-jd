import { License } from '../types/index.ts';
import { axiosGetRequest, axiosPostRequest, AxiosReturn } from './axios.ts';

export const getCartRequest = async (): Promise<AxiosReturn> => {
	return await axiosGetRequest(`/cart`);
};

export const addProductToCartRequest = async ({
	id,
	l,
}: {
	id: string;
	l: License;
}) => {
	return await axiosPostRequest(`/cart/add`, { id, license: l });
};

export const getFreeRequest = async (id: string): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/product/get/free`, { id });
};

export const removeProductFromCartRequest = async (
	id: string
): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/cart/remove`, { id });
};

export const clearCartRequest = async (): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/cart/clear`);
};

export const getPaymentsRequest = async (): Promise<AxiosReturn> => {
	return await axiosGetRequest(`/payments`);
};

export const validateCouponRequest = async (
	id: string
): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/cart/coupon/validate`, { id });
};
