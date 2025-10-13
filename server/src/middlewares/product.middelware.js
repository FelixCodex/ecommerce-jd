import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import DriveController from '../controllers/drive.controller.js';

export async function convertToWebP(files) {
	if (!files) return;

	for (const file of files) {
		const inputPath = file.path;
		const outputPath = path.join(
			path.dirname(inputPath),
			`${path.parse(inputPath).name}.webp`
		);

		try {
			await sharp(inputPath)
				.resize({ width: 800 })
				.webp({ quality: 90 }) // Ajustar calidad entre 0 y 100
				.toFile(outputPath);

			fs.unlinkSync(inputPath); // Eliminar la imagen original
			file.path = outputPath; // Actualizar la referencia del archivo a WebP
		} catch (error) {
			console.error(`Error converting ${file.filename} to WebP:`, error);
		}
	}
}

export async function middleWareWebP(req, res, next) {
	try {
		if (req.files.image) await convertToWebP(req.files.image);
		if (req.files.gallery) await convertToWebP(req.files.gallery);

		next();
	} catch (error) {
		return res.status(500).json({ error: 'Error processing images' });
	}
}

export async function middleWareDriveUpload(req, res, next) {
	const driveController = new DriveController();
	try {
		if (req.files.file && req.files.file[0]) {
			const uploaded = await driveController.uploadFile(req.files.file[0].path);
			req.body.fileDriveId = uploaded.id; // Pasar el ID del archivo a la lógica del controlador
		}

		next();
	} catch (error) {
		console.error('Error subiendo archivo a Drive:', error);
		res.status(500).json({ error: 'Error subiendo archivo a Drive' });
	}
}
