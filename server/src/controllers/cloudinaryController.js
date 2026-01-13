const router = require("express").Router();
const cloudinaryService = require("../services/cloudinaryService");

router.get("/generate-signature", async (req, res) => {
	try {
		const signatureData = await cloudinaryService.generateSignature();

		res.status(200).json({
			status: "success",
			data: signatureData,
		});
	} catch (error) {
		// TODO: Implement error handling
		console.log(error.message);
	}
});

module.exports = router;
