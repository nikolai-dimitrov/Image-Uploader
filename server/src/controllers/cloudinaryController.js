const router = require("express").Router();
const cloudinaryService = require("../services/cloudinaryService");

router.get("/generate-signature", async (req, res) => {
	try {
		const { timestamp, signature, folderName } =
			await cloudinaryService.generateSignature();

		res.status(200).json({
			signature: signature,
			timestamp: timestamp,
			apiKey: process.env.CLOUDINARY_KEY,
			cloudName: process.env.CLOUDINARY_CLOUD_NAME,
			folderName: folderName,
		});
	} catch (error) {
		// TODO: Implement error handling
		console.log(error.message);
	}
});

module.exports = router;
