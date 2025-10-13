import { connectDB } from '../../db.js';

const connection = await connectDB();

class PaymentModel {
	static async getAll() {
		const product = await connection.execute(
			'SELECT HEX(id) id, HEX(userId) userId, state, created_at, price, bookingDate, orderId FROM payments ORDER BY `created_at` desc;'
		);

		if (product.rows.length == 0) return { error: ['Payment not found'] };

		return product.rows;
	}

	static async getAllCompleted() {
		const product = await connection.execute(
			'SELECT HEX(id) id, HEX(userId) userId, state, created_at, price FROM payments WHERE state=2 ;'
		);

		if (product.rows.length == 0) return { error: ['Payment not found'] };

		return product.rows;
	}

	static async getById({ id }) {
		const product = await connection.execute(
			'SELECT HEX(id) id, HEX(userId) userId, cart, state, shortURL, created_at,price FROM payments WHERE id = UNHEX(?);',
			[id]
		);

		if (product.rows.length == 0) return { error: ['Payment not found'] };

		const parsedProduct = {
			...product.rows[0],
			cart: JSON.parse(product.rows[0].cart),
		};

		return parsedProduct;
	}

	static async getByUserId({ id }) {
		const product = await connection.execute(
			'SELECT HEX(id) id, HEX(userId) userId, cart, state, shortURL, created_at, price FROM payments WHERE userId = UNHEX(?);',
			[id]
		);
		if (product.rows.length == 0) return { error: ['Payment not found'] };

		const parsedProduct = {
			...product.rows[0],
			cart: JSON.parse(product.rows[0].cart),
		};

		return parsedProduct;
	}

	static async getHexUUID({ uuid }) {
		const product = await connection.execute(
			`SELECT HEX(UNHEX(REPLACE('${uuid}', '-',''))) uuid`
		);

		return product.rows[0].uuid;
	}

	static async getDateTime() {
		const product = await connection.execute(`SELECT CURRENT_TIMESTAMP`);

		return product.rows[0].CURRENT_TIMESTAMP;
	}

	static async getByUserIdAndId({ userId, id }) {
		const product = await connection.execute(
			'SELECT HEX(id) id, HEX(userId) userId, cart, state, shortURL, created_at, price FROM payments WHERE userId = UNHEX(?) AND id = UNHEX(?);',
			[userId, id]
		);
		console.log(product);

		if (product.rows.length == 0) return { error: ['Payment not found'] };

		const parsedProduct = {
			...product.rows[0],
			cart: JSON.parse(product.rows[0].cart),
		};

		return parsedProduct;
	}

	static async create({ uuid, userId, cart, shortURL, price }) {
		try {
			await connection.execute(
				`INSERT INTO payments(id, cart, shortURL, userId, price) 
          VALUES(UNHEX(REPLACE("${uuid}", "-","")),?,?,UNHEX(REPLACE("${userId}", "-","")),?)`,
				[cart, shortURL, price]
			);
			return {};
		} catch (e) {
			console.log(e);
			return { error: ['Error while saving payment'] };
		}
	}

	static async setCompletedById({ uuid, order, bookingDate }) {
		console.log('Data to set completed: ', { uuid, order, bookingDate });
		await connection.execute(
			'UPDATE payments SET state=2, orderId=?, bookingDate=? WHERE id = UNHEX(?);',
			[order, bookingDate, uuid]
		);
	}

	static async setFailedById({ uuid, order, bookingDate }) {
		await connection.execute(
			'UPDATE payments SET state=0, orderId=?, bookingDate=? WHERE id = UNHEX(?);',
			[order, bookingDate, uuid]
		);
	}
}

export default PaymentModel;
