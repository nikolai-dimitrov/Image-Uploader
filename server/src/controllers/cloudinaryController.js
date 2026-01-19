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
		return res.status(500).json({
			message:
				"Error occurred while preparing for upload. Try again later.",
		});
	}
});

module.exports = router;
