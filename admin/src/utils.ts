import { LOG_AXIOS_DATA, LOG_AXIOS_ERRORS, monthsEn, monthsEs } from './consts';

export function formatMinutes(num: number) {
	if (num < 10) {
		return '0' + num;
	}
	return num;
}

export function formatHours(num: number) {
	if (num > 12) {
		return num - 12;
	}
	if (num == 0) {
		return 12;
	}
	return num;
}

export function whichMeridian(num: number) {
	if (num > 12) {
		return 'pm';
	}
	return 'am';
}

export function createDateTextFromLanguage(lang: 'es' | 'en', date: Date) {
	if (lang == 'es') {
		return `${date.getDate()} de ${
			monthsEs[date.getMonth()]
		} ${date.getFullYear()}, ${formatHours(date.getHours())}:${formatMinutes(
			date.getMinutes()
		)} ${whichMeridian(date.getHours())}`;
	} else if (lang == 'en') {
		return `${
			monthsEn[date.getMonth()]
		} ${date.getDate()}, ${date.getFullYear()}`;
	}
}

export function formatDateTime(date: Date): string {
	const pad = (num: number) => String(num).padStart(2, '0');

	const year = date.getFullYear();
	const month = pad(date.getMonth() + 1); // Meses empiezan desde 0
	const day = pad(date.getDate());
	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());
	const seconds = pad(date.getSeconds());

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatBookingDateTime(date: string): Date {
	return new Date(formatDateTime(new Date(date)));
}

export function log_error(...args: unknown[]) {
	if (LOG_AXIOS_ERRORS) {
		console.log(...args);
	}
}

export function log_data(...args: unknown[]) {
	if (LOG_AXIOS_DATA) {
		console.log(...args);
	}
}
