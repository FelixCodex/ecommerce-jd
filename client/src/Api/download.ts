import { AxiosProgressEvent } from 'axios';
import axios from './axios.ts';
import { log_error } from '../utils.ts';

export const download = async (
	id: string,
	controller: AbortController,
	callback?: (progressEvent: AxiosProgressEvent) => void
) => {
	try {
		return await axios.get(`/download/${id}`, {
			signal: controller.signal,
			responseType: 'blob',
			onDownloadProgress: progressEvent => {
				if (callback) callback(progressEvent);
			},
		});
	} catch (error) {
		log_error(error);
		throw error;
	}
};
