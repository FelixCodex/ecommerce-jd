import { axiosGetRequest, AxiosReturn } from './axios.ts';

export const getProductsRequest = async (): Promise<AxiosReturn> => {
	return await axiosGetRequest(`/products`);
};

export const getProductRequest = async (id: string): Promise<AxiosReturn> => {
	return await axiosGetRequest(`/product/${id}`);
};
