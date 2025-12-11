import { execute } from '../../db.js';

class BeneficiaryModel {
	static async getAll() {
		const product = await execute(
			'SELECT HEX(id) id, name ,ratingBeforeMax ,ratingAfterMax ,max ,paid ,accumulation ,created_at FROM beneficiarys;'
		);

		return product.rows;
	}

	static async getById({ id }) {
		const product = await execute(
			'SELECT HEX(id) id, name ,ratingBeforeMax ,ratingAfterMax ,max ,paid ,accumulation ,created_at FROM beneficiarys WHERE id = UNHEX(?)',
			[id]
		);

		if (product.rows.length == 0) return { error: ['Beneficiary not found'] };

		return product.rows;
	}

	static async create({ id, name, ratingBeforeMax, ratingAfterMax, max }) {
		try {
			await execute(
				`INSERT INTO beneficiarys(id, name ,ratingBeforeMax ,ratingAfterMax ,max ) 
       VALUES(UNHEX(REPLACE("${id}", "-","")),?,?,?,?);`,
				[name, ratingBeforeMax, ratingAfterMax, max]
			);
			return {};
		} catch (e) {
			console.log(e);
			return { error: ['Error while saving beneficiary'] };
		}
	}

	static async delete({ id }) {
		try {
			await execute('DELETE FROM beneficiarys WHERE id = UNHEX(?);', [id]);
			return {};
		} catch (e) {
			console.log(e);
			return { error: ['Error while deleting beneficiary'] };
		}
	}

	static async pay({ id }) {
		const product = await execute(
			'SELECT HEX(id) id, name ,ratingBeforeMax ,ratingAfterMax ,max ,paid ,accumulation ,created_at FROM beneficiarys WHERE id = UNHEX(?)',
			[id]
		);
		if (product.rows.length == 0) return { error: ['Beneficiary not found'] };

		try {
			const accum = product.rows[0].paid + product.rows[0].accumulation;
			await execute(
				'UPDATE beneficiarys SET paid=?, accumulation=0 WHERE id = UNHEX(?)',
				[accum, id]
			);
			return {};
		} catch (e) {
			console.log(e);
			return { error: ['Error while deleting beneficiary'] };
		}
	}

	static async addAccum({ id, accum }) {
		try {
			await execute(
				'UPDATE beneficiarys SET accumulation=? WHERE id = UNHEX(?)',
				[accum, id]
			);
			return {};
		} catch (e) {
			console.log(e);
			return { error: ['Error while deleting beneficiary'] };
		}
	}
}

export default BeneficiaryModel;
