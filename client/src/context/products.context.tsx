import { createContext, useContext, useEffect, useState } from 'react';
import { getProductsRequest } from '../Api/products';
import { Product } from '../types';
import { log_data, log_error } from '../utils';

interface ProductContextType {
	products: Product[] | null;
	loadingProducts: boolean;
}

interface ProductProviderProps {
	children: import('react').ReactElement;
}

export const ProductContext = createContext<ProductContextType>({
	products: null,
	loadingProducts: true,
});

const localProducts = localStorage.getItem('products');
const initialProductState =
	localProducts != null && localProducts != 'null'
		? JSON.parse(localProducts)
		: null;

export function ProductProvider({ children }: ProductProviderProps) {
	const [products, setProducts] = useState<Product[] | null>(
		initialProductState
	);
	const [loadingProducts, setLoadingProducts] = useState(true);

	const saveInLocal = (products: Product[]) => {
		localStorage.setItem('products', JSON.stringify(products));
	};

	const getProducts = async () => {
		setLoadingProducts(true);
		try {
			const req = await getProductsRequest();

			log_data('Response from products: ', req);

			if (!req.success) throw new Error('Products request failed');
			if (req.response?.status === 200) {
				setProducts(req.response?.data);
				saveInLocal(req.response?.data);
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
		<ProductContext.Provider value={{ products, loadingProducts }}>
			{children}
		</ProductContext.Provider>
	);
}

export const useProduct = () => {
	const context = useContext(ProductContext);
	if (context == undefined) {
		throw new Error('useProduct must be used within a ProductProvider');
	}
	return context;
};
