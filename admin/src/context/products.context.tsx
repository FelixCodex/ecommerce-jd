import { createContext, useEffect, useState } from 'react';
import { getAllProductsRequest } from '../api/products';
import { Product } from '../types';
import { log_data, log_error } from '../utils';

interface ProductContextType {
	products: Product[];
	loadingProducts: boolean;
	updateProduct: (prod: {
		id: string;
		title: string;
		description: string;
		personal: number;
		professional: number;
	}) => void;
}

interface ProductProviderProps {
	children: import('react').ReactElement;
}

export const ProductContext = createContext<ProductContextType>({
	products: [],
	loadingProducts: true,
	updateProduct: () => {},
});

export function ProductProvider({ children }: ProductProviderProps) {
	const [products, setProducts] = useState<Product[]>([]);
	const [loadingProducts, setLoadingProducts] = useState(true);

	const updateProduct = (product: {
		id: string;
		title: string;
		description: string;
		personal: number;
		professional: number;
	}) => {
		const UpdatedProduct = products.map(p => {
			if (p.id == product.id)
				return {
					...p,
					title: product.title,
					description: product.description,
					personal: product.personal,
					professional: product.professional,
				};
			return p;
		});
		setProducts(UpdatedProduct);
	};

	const getProducts = async () => {
		setLoadingProducts(true);
		try {
			log_data('Starting request products');

			const req = await getAllProductsRequest();

			log_data('Response from products: ', req);

			if (!req.success) throw new Error('Request failed');
			if (req.response?.status == 200) {
				setProducts(req.response.data);
			} else {
				setProducts([] as Product[]);
			}
		} catch (error) {
			log_error('Error fetching products data: ', error);
		} finally {
			setLoadingProducts(false);
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<ProductContext.Provider
			value={{ products, loadingProducts, updateProduct }}
		>
			{children}
		</ProductContext.Provider>
	);
}
