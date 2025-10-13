import { axiosPostRequest, AxiosReturn } from './axios.ts';

export const sendMailRequest = async (data: {
	name: string;
	email: string;
	message: string;
}): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/send-mail`, data);
};
