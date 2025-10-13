import { connectDB } from "../../db.js";

const connection = await connectDB();

class PaymentModel {
  static async getById({ id }) {
    const [product] = await connection.query(
      "SELECT BIN_TO_UUID(id) id, BIN_TO_UUID(userId) userId, cart, coupon, state, shortURL, created_at FROM payments WHERE id = UUID_TO_BIN(?);",
      [id]
    );

    if (product.length == 0) return { error: ["Payment not found"] };

    const parsedProduct = { ...product[0], cart: JSON.parse(product[0].cart) };

    return parsedProduct;
  }

  static async getAllPendingByUserId({ id }) {
    const [product] = await connection.query(
      "SELECT BIN_TO_UUID(id) id, BIN_TO_UUID(userId) userId, cart, coupon, state, shortURL, created_at, price FROM payments WHERE userId = UUID_TO_BIN(?) AND state = 1;",
      [id]
    );

    return product;
  }

  static async getByUserId({ id }) {
    const [product] = await connection.query(
      "SELECT BIN_TO_UUID(id) id, BIN_TO_UUID(userId) userId, cart, coupon, state, shortURL, created_at, price FROM payments WHERE userId = UUID_TO_BIN(?);",
      [id]
    );

    return product;
  }

  static async create({ uuid, userId, cart, discountCoupon, shortURL, price }) {
    try {
      await connection.query(
        `INSERT INTO payments(id, cart, coupon, shortURL, userId, price) 
          VALUES(UUID_TO_BIN("${uuid}"),?,?,?,UUID_TO_BIN("${userId}"),?)`,
        [cart, discountCoupon, shortURL, price]
      );

      const [payment] = await connection.query(
        "SELECT BIN_TO_UUID(id) id, BIN_TO_UUID(userId) userId, cart, coupon FROM payments WHERE id = UUID_TO_BIN(?);",
        [uuid]
      );

      if (payment.length == 0) return { error: ["Payment not found"] };

      return payment[0];
    } catch (e) {
      console.log(e);
      return { error: ["Error while saving payment"] };
    }
  }

  static async setCompletedById({ uuid }) {
    await connection.query(
      "UPDATE payments SET state=2 WHERE id = UUID_TO_BIN(?);",
      [uuid]
    );
  }

  static async setFailedById({ uuid }) {
    await connection.query(
      "UPDATE payments SET state=0 WHERE id = UUID_TO_BIN(?);",
      [uuid]
    );
  }
}

export default PaymentModel;
