import { Router } from 'express';
import { connectDB } from '../db.js';

const connection = await connectDB();

const database = process.env.MYSQLDATABASE;

export const createDataBaseRouter = () => {
	const router = Router();

	router.get('/database/create/users', async () => {
		await connection.query(
			`use ${database};
      create table users(
          id binary(16) not null unique DEFAULT (UUID_TO_BIN(UUID())),
          username varchar(50) NOT NULL,
          email varchar(50) NOT NULL UNIQUE,
          password varchar(150) NOT NULL,
          created_at timestamp NOT NULL DEFAULT (NOW()),
          cart varchar(3520) default "[]",
          primary key(ID)
      );`
		);
	});
	router.get('/database/create/purchased_products', async () => {
		await connection.query(
			`use ${database};
      create table purchased_products(
        purchaseId binary(16) not null unique DEFAULT (UUID_TO_BIN(UUID())),
          userId binary(16) not null,
          productId varchar(10) NOT NULL,
          purchased_at timestamp DEFAULT (NOW()),
          image varchar(255) NOT NULL,
          title varchar(255) NOT NULL ,
          primary key(purchaseId)
      );`
		);
	});
	router.get('/database/create/products', async () => {
		await connection.query(
			`use ${database};
      create table products(
          "id" varchar(10) NOT NULL unique,
          "title" varchar(255) NOT NULL,
          "description" varchar(255) DEFAULT NULL,
          "price" float NOT NULL DEFAULT '1',
          "image" varchar(255) NOT NULL,
          "create_at" timestamp NOT NULL DEFAULT(now()),
          "gallery" varchar(4500) DEFAULT '[]',
          PRIMARY KEY ("id")

      );`
		);
	});

	router.get('/database/create/payments', async () => {
		await connection.query(
			`use ${database};
      CREATE TABLE "payments" (
          "id" binary(16) NOT NULL unique,
          "cart" varchar(5120) NOT NULL DEFAULT '[]',
          "created_at" timestamp NOT NULL DEFAULT(now()),
          "state" int DEFAULT '1' not null,
          "shortURL" varchar(255) NOT NULL,
          "userId" binary(16) NOT NULL,
          "price" varchar(255) NOT NULL,
          PRIMARY KEY ("id"),
          CONSTRAINT "payments_chk_1" CHECK (
              (
                  ("state" >= 0)
                  and ("state" <= 2)
              )
          )
      )`
		);
	});

	return router;
};
