// import mysql from "mysql2/promise";
// import { DB_CONNECTION_DATA } from "./config.js";
// const connection = await mysql.createConnection(DB_CONNECTION_DATA);
import { createClient } from '@libsql/client';
import { TURSO_AUTH, TURSO_URL } from './config.js';

const connection = createClient({
	url: TURSO_URL,
	authToken: TURSO_AUTH,
});

export async function execute(statement, args, tag) {
	try {
		return await connection.execute(statement, args);
	} catch (error) {
		console.log('Error in: ', tag);
		console.log('Error: ', error);
		return { rows: [] };
	}
}

console.log('>> DB CONNECTED');

export async function connectDB() {
	return connection;
}
