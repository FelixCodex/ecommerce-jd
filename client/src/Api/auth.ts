import { Preferences } from '../types/index.ts';
import { axiosGetRequest, axiosPostRequest, AxiosReturn } from './axios.ts';

export const registerRequest = async (user: {
	username: string;
	email: string;
	password: string;
}): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/register`, user);
};

export const loginRequest = async (user: {
	email: string;
	password: string;
}): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/login`, user);
};

export const verifyTokenRequest = async (): Promise<AxiosReturn> => {
	return await axiosGetRequest(`/verify`);
};

export const googleAuthRequest = async (): Promise<AxiosReturn> => {
	return await axiosGetRequest(`/auth/google`);
};

export const logoutRequest = async (): Promise<AxiosReturn> => {
	return await axiosGetRequest(`/logout`);
};

export const preferencesRequest = async (
	preferences: Preferences
): Promise<AxiosReturn> => {
	return await axiosPostRequest(`/preferences`, preferences);
};
