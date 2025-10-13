import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';
import multer from 'multer';
import path from 'path';
import { authRequired } from '../middlewares/validateToken.middleware.js';
import { middleWareWebP } from '../middlewares/product.middelware.js';
import FreeController from '../controllers/free.controller.js';
import { adminRequired } from '../middlewares/admin.middleware.js';

export const createProductRouter = () => {
	const router = Router();

	const productController = new ProductController();
	const freeController = new FreeController();

	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, '/app/imgs');
		},
		filename: (req, file, cb) => {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
			cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
		},
	});

	const upload = multer({ storage });

	router.post(
		'/product',
		upload.fields([
			{ name: 'image', maxCount: 1 },
			{ name: 'gallery', maxCount: 10 },
		]),
		middleWareWebP,
		productController.create
	);
	router.get('/products', productController.getProducts);
	router.get(
		'/productswd',
		adminRequired,
		productController.getProductsWithDrive
	);
	router.post('/product/delete', adminRequired, productController.delete);
	router.post('/product', authRequired, productController.getProductById);
	router.post('/product/update', adminRequired, productController.update);
	router.post(
		'/product/updatedrive',
		adminRequired,
		productController.updateDriveInfo
	);
	router.post(
		'/product/get/free',
		authRequired,
		freeController.purchaseFreeProduct
	);

	return router;
};
