/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react';
import {
	CART_ACTIONS,
	cartInitialState,
	cartReducer,
} from '../reducers/cart.reducer.ts';
import {
	addProductToCartRequest,
	getCartRequest,
	removeProductFromCartRequest,
} from '../Api/cart.ts';
import { CartProduct, License, PurchasedProduct } from '../types/index.ts';
import { getPurchasedRequest, getRateRequest } from '../Api/payment.ts';
import { log_data, log_error } from '../utils.ts';
import { useAuth } from './auth.context.tsx';

export const CartContext = createContext({
	state: [] as CartProduct[],
	addToCart: (_id: string, _l: License) => {},
	removeFromCart: (_id: string) => {},
	clearCart: () => {},
	clearPurchased: () => {},
	clearCartFromClient: () => {},
	loadCart: () => {},
	loadPurchased: () => {},
	loadingCart: false,
	loadingPurchased: true,
	purchased: [] as PurchasedProduct[],
	rate: 0,
	addPurchase: (_purchase: PurchasedProduct) => {},
});

function useCartReducer() {
	const [state, dispatch] = useReducer(cartReducer, cartInitialState);
	const [loadingCart, setLoadingCart] = useState(false);
	const [loadingPurchased, setLoadingPurchased] = useState(true);
	const [rate, setRate] = useState(1);
	const loadingcartQueue = useRef(false);
	const cartQueue = useRef<{ id: string; l: License }[]>([]);
	const [purchased, setPurchased] = useState([] as PurchasedProduct[]);

	const { logged } = useAuth();

	const loadCart = async () => {
		setLoadingCart(true);
		try {
			log_data('Starting cart request');

			const req = await getCartRequest();

			log_data('Response from cart: ', req);

			if (!req.success) throw new Error('Cart request failed');
			if (req.response?.status === 200) {
				dispatch({
					type: CART_ACTIONS.SET_CART,
					payload: req.response?.data,
				});
			} else {
				log_error('Error loading cart');
			}
		} catch (error) {
			log_error('Error fetching cart data', error);
		} finally {
			setLoadingCart(false);
		}
	};

	const addPurchase = async (purchase: PurchasedProduct) => {
		setPurchased(prev => [...prev, purchase]);
	};

	const loadPurchased = async () => {
		setLoadingPurchased(true);
		try {
			const req = await getPurchasedRequest();
			if (!req.success) throw new Error('Purchases request failed');
			if (req.response?.status === 200) {
				setPurchased(req.response?.data);
			} else {
				log_error('Error loading purchased');
			}
		} catch (error) {
			log_error('Error fetching purchased data', error);
		} finally {
			setLoadingPurchased(false);
		}
	};

	const loadRate = async () => {
		try {
			const req = await getRateRequest();
			if (!req.success) throw new Error('Rate request failed');
			if (req.response?.status === 200) {
				setRate(req.response?.data.rate);
			} else {
				log_error('Error loading rate');
			}
		} catch (error) {
			log_error('Error fetching rate data', error);
		}
	};

	useEffect(() => {
		loadRate();
	}, []);

	useEffect(() => {
		if (!loadingCart) {
			loadCart();
		}
		loadPurchased();
	}, [logged]);

	const addToCart = async (id: string, l: License) => {
		cartQueue.current = [...cartQueue.current, { id, l }];
		if (!loadingcartQueue.current) {
			addToCartSequence();
		}
	};

	const addToCartSequence = async () => {
		if (cartQueue.current.length != 0) {
			loadingcartQueue.current = true;
			const req = await addProductToCartRequest({
				id: cartQueue.current[0].id,
				l: cartQueue.current[0].l,
			});

			if (!req.success) throw new Error('Add product request failed');
			if (req.response?.status === 200) {
				dispatch({
					type: CART_ACTIONS.SET_CART,
					payload: req.response?.data,
				});
			} else {
				log_error('Error adding product to cart');
			}
			cartQueue.current.splice(0, 1);
			addToCartSequence();
		} else {
			loadingcartQueue.current = false;
		}
	};

	const removeFromCart = async (id: string) => {
		const req = await removeProductFromCartRequest(id);

		if (!req.success) throw new Error('Remove product request failed');
		if (req.response?.status === 200) {
			dispatch({
				type: CART_ACTIONS.SET_CART,
				payload: req.response?.data,
			});
		} else {
			log_error('Error removing product from cart');
		}
	};

	const clearCart = async () => {
		dispatch({
			type: CART_ACTIONS.CLEAR_CART,
			payload: [],
		});
	};

	const clearPurchased = async () => {
		setPurchased([] as PurchasedProduct[]);
	};

	const clearCartFromClient = async () => {
		dispatch({
			type: CART_ACTIONS.CLEAR_CART,
			payload: [],
		});
	};

	return {
		state,
		addToCart,
		removeFromCart,
		loadingCart,
		clearCart,
		clearCartFromClient,
		loadCart,
		loadingPurchased,
		purchased,
		loadPurchased,
		clearPurchased,
		rate,
		addPurchase,
	};
}

export function CartProvider({ children }: { children: ReactNode }) {
	const {
		state,
		addToCart,
		removeFromCart,
		loadingCart,
		clearCart,
		clearCartFromClient,
		loadCart,
		loadingPurchased,
		purchased,
		loadPurchased,
		clearPurchased,
		rate,
		addPurchase,
	} = useCartReducer();

	return (
		<CartContext.Provider
			value={{
				state,
				addToCart,
				removeFromCart,
				loadingCart,
				clearCart,
				clearCartFromClient,
				loadCart,
				loadingPurchased,
				purchased,
				loadPurchased,
				clearPurchased,
				rate,
				addPurchase,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export const useCart = () => {
	const context = useContext(CartContext);
	if (context == undefined) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
