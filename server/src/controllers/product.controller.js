import ProductModel from '../models/turso/product.model.js';

class ProductController {
	getProducts = async (req, res) => {
		const response = await ProductModel.getAll();

		res.json(response);
	};

	getProductsWithDrive = async (req, res) => {
		const response = await ProductModel.getAllWithDrive();

		res.json(response);
	};

	getProductById = async (req, res) => {
		const { id } = req.body;

		const response = await ProductModel.getById({ input: { id } });

		console.log(response);

		if (response.message) return res.status(406).send(response);
		if (response.error) return res.status(500).send(response.error);

		res.send(response);
	};

	create = async (req, res) => {
		const {
			title,
			description,
			personal,
			professional,
			driveUrl,
			weight,
			isFree,
		} = req.body;

		const img = req.files['image'] ? req.files['image'][0] : null; // Imagen principal
		const gallery = req.files['gallery'] || []; // Array de imágenes de la galería

		const galleryImgs = [];
		const image = img.filename.slice(0, img.filename.length - 4);

		Array.from(gallery).forEach(item => {
			galleryImgs.push(item.filename.slice(0, item.filename.length - 4));
		});

		const driveId = driveUrl.startsWith('https://drive.google.com/file/d/')
			? driveUrl.slice(32).split('/')[0]
			: driveUrl;

		const response = await ProductModel.create({
			input: {
				title,
				description,
				personal,
				professional,
				image,
				gallery: galleryImgs,
				driveId,
				weight,
				isFree,
			},
		});

		if (response.message) return res.status(406).send(response);
		if (response.error) return res.status(500).send(response.error);

		res.send(response);
	};

	delete = async (req, res) => {
		const { id } = req.body;

		const response = await ProductModel.delete({ id });

		if (response.error) return res.status(500).send(response.error);

		res.status(200).send({ message: 'Product deleted successfully' });
	};

	update = async (req, res) => {
		const { id, title, description, personal, professional, driveUrl, weight } =
			req.body;

		const driveId = driveUrl.startsWith('https://drive.google.com/file/d/')
			? driveUrl.slice(32).split('/')[0]
			: driveUrl;

		const response = await ProductModel.update({
			id,
			title,
			description,
			personal,
			professional,
			driveId,
			weight,
		});

		if (response.error) return res.status(500).send(response.error);

		res.status(200).send({ message: 'Product updated successfully' });
	};

	updateDriveInfo = async (req, res) => {
		const { driveId, weight } = req.body;

		const response = await ProductModel.updateDriveInfo({
			driveId,
			weight,
		});

		if (response.error) return res.status(500).send(response.error);

		res
			.status(200)
			.send({ message: 'Product drive info updated successfully' });
	};
}

export default ProductController;
