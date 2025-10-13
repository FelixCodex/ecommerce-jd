import { axiosGetRequest, axiosPostRequest, AxiosReturn } from './axios.ts';

export const createCommentRequest = async ({
	message,
	productId,
}: {
	message: string;
	productId: string;
}): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/comment/create`, { message, productId });
};

export const getCommentsRequest = async (): Promise<AxiosReturn> => {
	return await axiosGetRequest(`/comments`);
};
