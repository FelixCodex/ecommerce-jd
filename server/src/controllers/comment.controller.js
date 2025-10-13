import CommentModel from '../models/turso/comment.model.js';
import UserModel from '../models/turso/user.model.js';

class CommentController {
	getAll = async (req, res) => {
		const response = await CommentModel.getAll();

		res.json(response);
	};

	getById = async (req, res) => {
		const { id } = req.body;

		const response = await CommentModel.getById({ id });

		res.json(response);
	};

	getByProductId = async (req, res) => {
		const { id } = req.body;

		const response = await CommentModel.getByProductId({ id });

		if (response.message) return res.status(406).send(response);
		if (response.error) return res.status(500).send(response.error);

		res.send(response);
	};

	create = async (req, res) => {
		const auth = req.auth;

		const { productId, message } = req.body;

		const userFound = await UserModel.getById(auth);
		if (!userFound) return res.status(404).send({ error: ['User not found'] });

		const response = await CommentModel.create({
			userId: auth.id,
			userName: userFound.username,
			productId,
			message,
		});

		if (response.message) return res.status(406).send(response);
		if (response.error) return res.status(500).send(response.error);

		res.send(response);
	};

	delete = async (req, res) => {
		const { id } = req.body;

		const response = await CommentModel.delete({ id });

		if (response.error) return res.status(500).send(response.error);

		res.status(200).send({ message: 'Product deleted successfully' });
	};

	update = async (req, res) => {
		const { id, message } = req.body;

		const response = await CommentModel.update({
			id,
			message,
		});

		if (response.error) return res.status(500).send(response.error);

		res.status(200).send({ message: 'Product updated successfully' });
	};
}

export default CommentController;
