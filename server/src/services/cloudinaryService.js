const cloudinary = require("cloudinary");

exports.generateSignature = async () => {
	const timestamp = Math.round((new Date().getTime()) / 1000);
	const signature = await cloudinary.utils.api_sign_request(
		{
			timestamp,
		},
		process.env.CLOUDINARY_SECRET
	);

	return { timestamp, signature };
};
