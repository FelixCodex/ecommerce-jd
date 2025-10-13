import { connectDB } from "../../db.js";

const connection = await connectDB();

class PurchasedModel {
  static async getById({ id }) {
    const [purchase] = await connection.query(
      "SELECT BIN_TO_UUID(purchaseId) purchaseId, BIN_TO_UUID(userId) userId, productId, purchased_at FROM purchased_products WHERE id = UUID_TO_BIN(?);",
      [id]
    );

    if (purchase.length == 0) return { error: ["Purchase not found"] };

    return purchase[0];
  }

  static async getByUserId({ id }) {
    const [purchase] = await connection.query(
      "SELECT BIN_TO_UUID(purchaseId) purchaseId, BIN_TO_UUID(userId) userId, productId, purchased_at , image FROM purchased_products WHERE userId = UUID_TO_BIN(?);",
      [id]
    );

    return purchase;
  }

  static async getByUserIdRestricted({ id }) {
    const [purchase] = await connection.query(
      "SELECT productId id, image, title, purchased_at FROM purchased_products WHERE userId = UUID_TO_BIN(?);",
      [id]
    );

    return purchase;
  }

  static async create({ userId, productId, image, title }) {
    try {
      const [uuidResult] = await connection.query("SELECT UUID() uuid;");
      const [{ uuid }] = uuidResult;

      await connection.query(
        `INSERT INTO purchased_products(purchaseId, userId, productId , image, title) 
          VALUES(UUID_TO_BIN("${uuid}"),UUID_TO_BIN("${userId}"),?,?, ?)`,
        [productId, image, title]
      );

      const [purchase] = await connection.query(
        "SELECT BIN_TO_UUID(purchaseId) purchaseId, BIN_TO_UUID(userId) userId, productId, purchased_at, image FROM purchased_products WHERE id = UUID_TO_BIN(?);",
        [uuid]
      );

      if (purchase.length == 0) return { error: ["Payment not found"] };

      return purchase[0];
    } catch (e) {
      console.log(e);
      return { error: ["Error while saving payment"] };
    }
  }

  static async createMultiple({ array, userId }) {
    try {
      console.log("Array: ", array);
      const values = [];
      let string = "";
      let i = 0;

      for (const item of array) {
        const [uuidResult] = await connection.query("SELECT UUID() uuid;");
        const [{ uuid }] = uuidResult;

        string += `${i == 0 ? "" : ","}(UUID_TO_BIN(?),UUID_TO_BIN(?),?,?,?)`;
        values.push(uuid, userId, item.id, item.image, item.title);
        i++;
      }

      console.log("String: ", string);
      console.log("Values: ", values);

      await connection.query(
        `INSERT INTO purchased_products(purchaseId, userId, productId, image, title) 
          VALUES${string}`,
        values
      );
    } catch (e) {
      console.log(e);
      return { error: ["Error while saving payment"] };
    }
  }
}

export default PurchasedModel;
