import { axiosGetRequest, axiosPostRequest, AxiosReturn } from './axios.ts';

export const sendMessageRequest = async (
	id: string,
	message: string
): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/messages/adm/create`, { id, message });
};

export const getMessagesRequest = async (): Promise<AxiosReturn> => {
	return await axiosGetRequest(`/messages`);
};

export const getChatsRequest = async (): Promise<AxiosReturn> => {
	return await axiosGetRequest(`/chats`);
};
