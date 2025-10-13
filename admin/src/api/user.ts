import { axiosPostRequest, AxiosReturn } from './axios.ts';

export const deleteUserRequest = async (id: string): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/user/delete`, { id });
};
