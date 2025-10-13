import { connectDB } from "../../db.js";
import bcrypt from "bcryptjs";
import { createDiscountCode } from "../../libs/utils.js";

const connection = await connectDB();

class DiscountModel {
  static async getById({ id }) {
    const [product] = await connection.query(
      "SELECT id, BIN_TO_UUID(userId) userId, discount, created_at, expires_at FROM coupons WHERE id = ?;",
      [id]
    );

    if (product.length == 0) return { error: ["Coupon not found"] };

    if (product[0].expires_at.getTime() - date.getTime > 0)
      return { error: ["Expired Coupon"] };

    return product[0];
  }

  static async getByUserIdWithData({ id }) {
    const [product] = await connection.query(
      "SELECT id, BIN_TO_UUID(userId) userId, discount, created_at, expires_at FROM coupons WHERE userId = UUID_TO_BIN(?);",
      [id]
    );

    const date = new Date();

    const filtered = product.filter(
      (item) => item.expires_at.getTime() - date.getTime > 0
    );

    return filtered;
  }

  static async getByUserId({ id }) {
    const [product] = await connection.query(
      "SELECT id, expires_at FROM coupons WHERE userId = UUID_TO_BIN(?);",
      [id]
    );

    const date = new Date();

    const filtered = product.filter(
      (item) => item.expires_at.getTime() - date.getTime > 0
    );

    const coupons = filtered.map((p) => {
      return p.id;
    });

    return coupons;
  }

  static async create({ id }) {
    try {
      const code = createDiscountCode(15, 15);

      await connection.query(
        `INSERT INTO coupons(id, userId, discount) 
          VALUES(?,UUID_TO_BIN("${id}"),?)`,
        [code, 15]
      );

      const [product] = await connection.query(
        "SELECT id, userId, discount, created_at, expires_at FROM coupons WHERE id = ?;",
        [code]
      );
      console.log(id);
      console.log(product);

      return product[0];
    } catch (e) {
      console.log(e);
      return { error: ["Error while saving product"] };
    }
  }

  static async delete({ id }) {
    try {
      await connection.query(`DELETE FROM coupons WHERE id = ?;`, [id]);
    } catch (e) {
      console.log(e);
    }
  }
}

export default DiscountModel;
