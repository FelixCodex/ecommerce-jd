import { axiosGetRequest, axiosPostRequest, AxiosReturn } from './axios.ts';

export const loginRequest = async (user: {
	username: string;
	password: string;
}): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/loginAdmin`, user);
};

export const verifyTokenRequest = async (): Promise<AxiosReturn> => {
	return await axiosGetRequest('/verifyAdmin');
};

export const logoutRequest = async (): Promise<AxiosReturn> => {
	return await axiosGetRequest('/logout');
};
