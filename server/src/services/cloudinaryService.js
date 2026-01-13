const cloudinary = require("cloudinary");

exports.generateSignature = async () => {
	const timestamp = new Date().getTime();
	const signature = await cloudinary.utils.api_sign_request(
		{
			timestamp,
		},
		process.env.CLOUDINARY_SECRET
	);

	return { timestamp, signature };
};
