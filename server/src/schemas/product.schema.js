import { z } from 'zod';

export const productSchema = z.instanceof(FormData);

export function validateProduct(object) {
	return productSchema.safeParse(object);
}
