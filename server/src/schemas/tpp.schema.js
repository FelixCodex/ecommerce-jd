import { z } from 'zod';

export const tppSchema = z.object({
	name: z.string({ required_error: 'name is required' }),
	lastName: z.string({ required_error: 'lastName is required' }),
	phoneNumber: z.string({ required_error: 'phoneNumber is required' }).min(7, {
		message: 'phoneNumber must be at least 7 characters',
	}),
	address: z.string({ required_error: 'address is required' }),
	country: z.number({ required_error: 'country is required' }).min(0, {
		message: 'country must be greater than 0',
	}),
	city: z.string({ required_error: 'city is required' }),
	postalCode: z.string({ required_error: 'postalCode is required' }),
});

export const quickTppSchema = z.object({
	name: z.string({ required_error: 'name is required' }),
	lastName: z.string({ required_error: 'lastName is required' }),
	phoneNumber: z.string({ required_error: 'phoneNumber is required' }).min(7, {
		message: 'phoneNumber must be at least 7 characters',
	}),
	address: z.string({ required_error: 'address is required' }),
	country: z.number({ required_error: 'country is required' }).min(0, {
		message: 'country must be greater than 0',
	}),
	city: z.string({ required_error: 'city is required' }),
	postalCode: z.string({ required_error: 'postalCode is required' }),
	license: z.string({ required_error: 'license is required' }),
});
