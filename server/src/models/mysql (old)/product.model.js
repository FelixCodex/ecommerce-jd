import { connectDB } from "../../db.js";
import bcrypt from "bcryptjs";
import { generateRandomCharacters } from "../../libs/utils.js";

const connection = await connectDB();

const table = process.env.MYSQLDATABSE + ".products";

class ProductModel {
  static async getAll() {
    const [products] = await connection.query(
      "SELECT id, title, description, price, image, gallery FROM " +
        table +
        " ORDER BY `create_at` desc"
    );
    console.log(products);
    products.map((item) => (item.gallery = JSON.parse(item.gallery)));

    return products;
  }

  static async getById({ id }) {
    const [product] = await connection.query(
      "SELECT id, title, description, price, image FROM " +
        table +
        " WHERE id = ?;",
      [id]
    );

    return product[0];
  }

  static async getMultipleById({ ids }) {
    const [product] = await connection.query(
      "SELECT id, title, description, price, image FROM " +
        table +
        " WHERE id IN(?);",
      ids
    );

    console.log(product);

    return product;
  }

  static async create({ input }) {
    const { title, description, price, image, gallery } = input;

    const galleryString = JSON.stringify(gallery);

    try {
      const id = generateRandomCharacters(8);

      await connection.query(
        `INSERT INTO ${table}(id, title, description, price, image, gallery) 
          VALUES(?,?,?,?,?,?)`,
        [id, title, description, price, image, galleryString]
      );

      const [product] = await connection.query(
        "SELECT id, title, description, price FROM " + table + " WHERE id = ?;",
        [id]
      );

      return product[0];
    } catch (e) {
      console.log(e);
      return { error: ["Error while saving product"] };
    }
  }

  static async delete({ id }) {
    try {
      await connection.query(`DELETE FROM ${table} WHERE id = ?;`, [id]);
    } catch (e) {
      console.log(e);
    }
  }

  static async update({ id, input }) {}
}

export default ProductModel;
