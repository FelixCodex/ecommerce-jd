import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../consts.ts';
import { log_error } from '../utils.ts';

export type AxiosReturn = {
	success: boolean;
	response?: AxiosResponse;
	error?: unknown;
};

const instance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

export async function axiosGetRequest(url: string): Promise<AxiosReturn> {
	try {
		const response = await instance.get(url);
		return { success: true, response };
	} catch (error) {
		log_error(error);
		return { success: false, error };
	}
}

export async function axiosPostRequest(
	url: string,
	data: unknown = null
): Promise<AxiosReturn> {
	try {
		const response = await instance.post(url, data);
		return { success: true, response };
	} catch (error) {
		log_error(error);
		return { success: false, error };
	}
}

export default instance;
