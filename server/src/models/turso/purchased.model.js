import { connectDB } from '../../db.js';
import crypto from 'node:crypto';

const connection = await connectDB();

class PurchasedModel {
	static async getAll() {
		const purchase = await connection.execute(
			'SELECT HEX(purchaseId) purchaseId, HEX(userId) userId, productId, purchased_at FROM purchased_products;'
		);

		if (purchase.rows.length == 0) return { error: ['Purchase not found'] };

		return purchase.rows;
	}

	static async getById({ id }) {
		const purchase = await connection.execute(
			'SELECT HEX(purchaseId) purchaseId, HEX(userId) userId, productId, purchased_at FROM purchased_products WHERE id = UNHEX(?);',
			[id]
		);

		if (purchase.rows.length == 0) return { error: ['Purchase not found'] };

		return purchase.rows[0];
	}

	static async getByUserId({ id }) {
		const purchase = await connection.execute(
			'SELECT HEX(purchaseId) id, HEX(userId) userId, productId, purchased_at, image FROM purchased_products WHERE userId = UNHEX(?);',
			[id]
		);

		return purchase.rows;
	}

	static async getByUserIdAndId({ userId, id }) {
		const purchase = await connection.execute(
			'SELECT HEX(purchaseId) id, HEX(userId) userId, productId, purchased_at, image FROM purchased_products WHERE userId = UNHEX(?) AND purchaseId = UNHEX(?);',
			[userId, id]
		);

		return purchase.rows[0];
	}

	static async getByUserIdAndProductId({ userId, id }) {
		const purchase = await connection.execute(
			'SELECT HEX(purchaseId) id, HEX(userId) userId, productId, purchased_at, image FROM purchased_products WHERE userId = UNHEX(?) AND productId = ?;',
			[userId, id]
		);

		return purchase.rows[0];
	}

	static async getByUserIdRestricted({ id }) {
		const purchase = await connection.execute(
			'SELECT productId id, image, title, purchased_at FROM purchased_products WHERE userId = UNHEX(?);',
			[id]
		);

		return purchase.rows;
	}

	static async create({ userId, productId, image, title }) {
		try {
			const uuid = crypto.randomUUID();

			await connection.execute(
				`INSERT INTO purchased_products(purchaseId, userId, productId , image, title) 
          VALUES(UNHEX(REPLACE("${uuid}", "-","")),UNHEX(REPLACE("${userId}", "-","")),?,?, ?)`,
				[productId, image, title]
			);

			const purchase = await connection.execute(
				`SELECT HEX(purchaseId) purchaseId, HEX(userId) userId, productId, purchased_at, image,title FROM purchased_products WHERE purchaseId = UNHEX(REPLACE("${uuid}", "-",""));`
			);

			console.log('purchase.rows: ', purchase.rows);

			if (purchase.rows.length == 0) return { error: ['Purchase not found'] };

			return purchase.rows[0];
		} catch (e) {
			console.log(e);
			return { error: ['Error while saving purchase'] };
		}
	}

	static async createMultiple({ array, userId }) {
		try {
			console.log('Array: ', array);
			const values = [];
			let string = '';
			let i = 0;

			for (const item of array) {
				const uuid = crypto.randomUUID();

				string += `${
					i == 0 ? '' : ','
				}(UNHEX(REPLACE("${uuid}", "-","")),UNHEX(?),?,?,?)`;
				values.push(userId, item.id, item.image, item.title);
				i++;
			}

			console.log('String: ', string);
			console.log('Values: ', values);

			await connection.execute(
				`INSERT INTO purchased_products(purchaseId, userId, productId, image, title) 
          VALUES${string}`,
				values
			);
		} catch (e) {
			console.log(e);
			return { error: ['Error while saving payment'] };
		}
	}

	static async deleteByUserId({ userId }) {
		try {
			await connection.execute(
				'DELETE FROM purchased_products WHERE userId = UNHEX(?);',
				[userId]
			);
		} catch (err) {
			console.log(err);
		}
	}

	static async deleteById({ id }) {
		try {
			await connection.execute(
				'DELETE FROM purchased_products WHERE id = UNHEX(?);',
				[id]
			);
		} catch (err) {
			console.log(err);
		}
	}
}

export default PurchasedModel;
