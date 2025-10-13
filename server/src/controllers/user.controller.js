import ProductModel from '../models/turso/product.model.js';
import TppModel from '../models/turso/tpp.model.js';
import UserModel from '../models/turso/user.model.js';
import ChatModel from '../models/turso/chat.model.js';
import CommentModel from '../models/turso/comment.model.js';
import PurchasedModel from '../models/turso/purchased.model.js';

class UserController {
	getAll = async (req, res) => {
		const users = await UserModel.getAll();
		if (!users) return res.status(404).send({ error: ['Users not found'] });

		return res.send(users);
	};

	getCart = async (req, res) => {
		const auth = req.auth;

		console.log(auth);
		const userCart = await UserModel.getCartById(auth);
		if (!userCart || userCart.error)
			return res.status(404).send({ error: ['User not found'] });
		return res.send(userCart);
	};

	getRate = async (req, res) => {
		const rate = await TppModel.getRate();
		return res.send({ rate });
	};

	add = async (req, res) => {
		const auth = req.auth;
		const { id, license } = req.body;

		const userCart = await UserModel.getCartById(auth);
		if (!userCart) return res.status(404).send({ error: ['User not found'] });

		const product = await ProductModel.getById({ id });
		if (!product) return res.status(404).send({ error: ['Product not found'] });
		if (product.isFree)
			return res.status(404).send({ error: ['Product is free'] });

		const alreadyInCart = userCart.some(prod => {
			return prod.id == product.id;
		});

		if (!alreadyInCart) {
			const newCart = [
				...userCart,
				{
					id: product.id,
					title: product.title,
					personal: product.personal,
					professional: product.professional,
					license:
						license == 'personal' || license == 'professional'
							? license
							: 'personal',
					image: product.image,
				},
			];

			UserModel.updateCart({
				id: auth.id,
				value: JSON.stringify(newCart),
			});

			return res.send(newCart);
		}
		return res.send(userCart);
	};

	remove = async (req, res) => {
		const auth = req.auth;

		const userCart = await UserModel.getCartById(auth);
		if (!userCart) return res.status(404).send({ error: ['User not found'] });
		const { id: productId } = req.body;

		const newCart = userCart.filter(item => item.id != productId);

		UserModel.updateCart({
			id: auth.id,
			value: JSON.stringify(newCart),
		});

		return res.send(newCart);
	};

	clear = async (req, res) => {
		const auth = req.auth;

		const userCart = await UserModel.getCartById(auth);
		if (!userCart) return res.status(404).send({ error: ['User not found'] });

		UserModel.updateCart({
			id: auth.id,
			value: JSON.stringify([]),
		});

		return res.send([]);
	};

	preferences = async (req, res) => {
		const auth = req.auth;

		const userFound = await UserModel.getById(auth);
		if (!userFound) return res.status(404).send({ error: ['User not found'] });

		const { preferences } = req.body;

		console.log(req.body);
		console.log(preferences, auth.id);

		try {
			await UserModel.preferences({
				preferences: JSON.stringify(preferences),
				id: auth.id,
			});
		} catch (error) {
			return res.status(500).send({ error: ['Something went wrong'] });
		}

		return res.status(200).send([]);
	};

	delete = async (req, res) => {
		const { id } = req.body;

		const userFound = await UserModel.getById({ id });
		if (!userFound) return res.status(404).send({ error: ['User not found'] });

		await UserModel.delete({ id });
		await ChatModel.deleteChatByUserId({ id });
		await ChatModel.deleteMessagesByUserId({ id });
		await CommentModel.deleteByUserId({ id });
		await PurchasedModel.deleteByUserId({ id });
	};
}

export default UserController;
