import { axiosGetRequest, axiosPostRequest, AxiosReturn } from './axios.ts';

export const sendMessageRequest = async (
	message: string
): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/message/create`, { message });
};

export const getMessagesRequest = async (): Promise<AxiosReturn> => {
	return await axiosGetRequest(`/message/user`);
};
