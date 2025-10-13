import { connectDB } from '../../db.js';
import { generateRandomCharacters } from '../../libs/utils.js';

const connection = await connectDB();

class ProductModel {
	static async getAll() {
		const products = await connection.execute(
			'SELECT id, title, description, personal, professional, image, gallery, created_at, weight, isFree FROM products ORDER BY `created_at` desc'
		);
		products.rows.map(item => (item.gallery = JSON.parse(item.gallery)));
		products.rows.map(item => (item.isFree = JSON.parse(item.isFree)));

		return products.rows;
	}

	static async getAllWithDrive() {
		const products = await connection.execute(
			'SELECT id, title, description, personal, professional, image, gallery, created_at, driveId, weight, isFree FROM products ORDER BY `created_at` desc'
		);
		products.rows.map(item => (item.gallery = JSON.parse(item.gallery)));
		products.rows.map(item => (item.isFree = JSON.parse(item.isFree)));

		return products.rows;
	}

	static async getById({ id }) {
		const product = await connection.execute(
			'SELECT id, title, description, personal, professional, image, driveId, weight, isFree FROM  products WHERE id = ?;',
			[id]
		);

		if (product.rows[0]) {
			product.rows[0].isFree = JSON.parse(product.rows[0].isFree);
		}

		return product.rows[0];
	}

	static async getMultipleById({ ids }) {
		const product = await connection.execute(
			'SELECT id, title, description, personal, professional, image, weight, isFree FROM products WHERE id IN(?);',
			ids
		);

		product.rows.map(item => (item.isFree = JSON.parse(item.isFree)));

		return product.rows;
	}

	static async create({ input }) {
		const {
			title,
			description,
			personal,
			professional,
			image,
			gallery,
			driveId,
			weight,
			isFree,
		} = input;

		const galleryString = JSON.stringify(gallery);
		console.log('DriveId: ', driveId);
		console.log('Weight: ', weight);

		try {
			const id = generateRandomCharacters(8);
			await connection.execute(
				`INSERT INTO products(id, title, description, personal, professional, image, gallery, driveId, weight, isFree) 
          VALUES(?,?,?,?,?,?,?,?,?,?)`,
				[
					id,
					title,
					description,
					personal,
					professional,
					image,
					galleryString,
					driveId,
					weight,
					isFree,
				]
			);

			const product = await connection.execute(
				'SELECT id, title, description, personal, professional FROM products WHERE id = ?;',
				[id]
			);

			return product.rows[0];
		} catch (e) {
			console.log(e);
			return { error: ['Error while saving product'] };
		}
	}

	static async delete({ id }) {
		try {
			await connection.execute(`DELETE FROM products WHERE id = ?;`, [id]);
			return {};
		} catch (e) {
			console.log(e);
			return { error: 'Error deleting product' };
		}
	}

	static async update({
		id,
		title,
		description,
		personal,
		professional,
		driveId,
		weight,
	}) {
		try {
			await connection.execute(
				`UPDATE products SET title=?, description=?, personal=?, professional=?, driveId=?, weight=?  WHERE id = ?`,
				[title, description, personal, professional, driveId, weight, id]
			);
			return {};
		} catch (e) {
			console.log(e);
			return { error: 'Error updating product' };
		}
	}

	static async updateDriveInfo({ driveId, weight }) {
		try {
			await connection.execute(
				`UPDATE products SET driveId=?, weight=? WHERE id = ?`,
				[driveId, weight]
			);
			return {};
		} catch (e) {
			console.log(e);
			return { error: 'Error updating product' };
		}
	}
}

export default ProductModel;
