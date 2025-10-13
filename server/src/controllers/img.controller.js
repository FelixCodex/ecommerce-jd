import path from 'path';
import { fileURLToPath } from 'url';

class ImgController {
	getImgById = async (req, res) => {
		try {
			const id = req.params.id;
			const __filename = fileURLToPath(import.meta.url);
			const __dirname = path.dirname(__filename);

			const imagesDir = path.join(__dirname, '../../imgs');

			const filePath = path.join(imagesDir, `${id}.webp`);

			console.log('File path: ', filePath);

			res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

			return res.sendFile(filePath);
		} catch (error) {
			console.error(error);
			return res.status(500).send('Server error');
		}
	};

	// deleteAllImages = (req, res) => {

	// 	const folderPath = '/app/imgs';

	// 	fs.readdir(folderPath, (err, files) => {
	// 		if (err) {
	// 			console.error('Error reading directory:', err);
	// 			return res.status(500).json({ error: 'Error reading directory' });
	// 		}

	// 		for (const file of files) {
	// 			const filePath = path.join(folderPath, file);
	// 			fs.unlink(filePath, err => {
	// 				if (err) {
	// 					console.error('Error deleting file:', err);
	// 				}
	// 			});
	// 		}

	// 		return res.json({ message: 'All images deleted successfully' });
	// 	});
	// };
}

export default ImgController;
