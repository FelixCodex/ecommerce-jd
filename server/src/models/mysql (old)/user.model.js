import { connectDB } from "../../db.js";
import bcrypt from "bcryptjs";

const connection = await connectDB();

const table = process.env.MYSQLDATABSE + ".users";

class UserModel {
  static async getAll() {
    const [user] = await connection.query(
      "SELECT BIN_TO_UUID(id) id, username, email FROM " + table,
      [id]
    );

    return user[0];
  }

  static async getById({ id }) {
    const [user] = await connection.query(
      "SELECT BIN_TO_UUID(id) id, username, email FROM " +
        table +
        " WHERE id = UUID_TO_BIN(?);",
      [id]
    );

    return user[0];
  }

  static async getByIdWithCart({ id }) {
    const [user] = await connection.query(
      "SELECT BIN_TO_UUID(id) id, username, email, cart FROM " +
        table +
        " WHERE id = UUID_TO_BIN(?);",
      [id]
    );

    return user[0];
  }

  static async getCartById({ id }) {
    const [cart] = await connection.query(
      "SELECT cart FROM users WHERE id = UUID_TO_BIN(?);",
      [id]
    );

    return JSON.parse(cart[0].cart);
  }

  static async create({ input }) {
    const { username, password, email } = input;

    const errors = [];
    if (await Validate.usernameInDB(username))
      errors.push("Username already exists");
    if (await Validate.emailsInDB(email)) errors.push("Email already exists");

    if (errors.length > 0) return { error: errors };

    try {
      const [uuidResult] = await connection.query("SELECT UUID() uuid;");
      const [{ uuid }] = uuidResult;

      const encryptedPass = await bcrypt.hash(password, 14);

      await connection.query(
        `INSERT INTO ${table}(id, username, password, email) 
          VALUES(UUID_TO_BIN("${uuid}"),?,?,?)`,
        [username, encryptedPass, email]
      );

      const [user] = await connection.query(
        "SELECT BIN_TO_UUID(id) id, username, email FROM " +
          table +
          " WHERE id = UUID_TO_BIN(?);",
        [uuid]
      );

      return user[0];
    } catch (e) {
      return { error: ["Error while saving user"] };
    }
  }

  static async authenticate({ input }) {
    const { password, email } = input;

    const [user] = await connection.query(
      "SELECT BIN_TO_UUID(id) id, username, email, password FROM " +
        table +
        " WHERE email = ?;",
      [email]
    );

    if (user.length == 0) return { error: ["User not found"] };

    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) return { error: ["Password does not match"] };

    return { id: user[0].id, username: user[0].username, email: user[0].email };
  }

  static async delete({ id }) {
    try {
      await connection.query(`DELETE FROM usuarios WHERE id = ?;`, [id]);
    } catch (e) {
      console.log(e);
    }
  }

  static async updateCart({ id, value }) {
    await connection.query(
      "UPDATE " + table + " SET cart=? WHERE id = UUID_TO_BIN(?);",
      [value, id]
    );
  }

  static async clearCart({ id }) {
    await connection.query(
      "UPDATE " + table + " SET cart='[]' WHERE id = UUID_TO_BIN(?);",
      [id]
    );
  }
}

class Validate {
  static async usernameInDB(username) {
    const users = await connection.query(
      `SELECT * FROM ${table} where username = ?`,
      [username]
    );

    if (users[0].length == 0) return false;
    return true;
  }

  static async emailsInDB(email) {
    const users = await connection.query(
      `SELECT * FROM ${table} where email = ?`,
      [email]
    );

    if (users[0].length == 0) return false;
    return true;
  }
}

export default UserModel;
