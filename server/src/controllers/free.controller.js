import ProductModel from '../models/turso/product.model.js';
import PurchasedModel from '../models/turso/purchased.model.js';

class FreeController {
	purchaseFreeProduct = async (req, res) => {
		const auth = req.auth;
		const { id } = req.body;

		const product = await ProductModel.getById({ id });
		if (!product) return res.status(404).send({ error: ['Product not found'] });
		if (!product.isFree)
			return res.status(403).send({ error: ['Product is not free'] });

		const purchased = await PurchasedModel.getByUserIdAndId({
			userId: auth.id,
			id,
		});
		console.log('Purchased: ', purchased);
		console.log('Data: ', {
			productId: id,
			userId: auth.id,
			image: product.image,
			title: product.title,
		});
		if (purchased)
			return res.status(403).send({ error: ['Product already purchased'] });

		const response = await PurchasedModel.create({
			productId: id,
			userId: auth.id,
			image: product.image,
			title: product.title,
		});

		if (response.error) return res.status(500).send(response.error);

		res.send(response);
	};
}

export default FreeController;
