const cloudinary = require("cloudinary");

exports.generateSignature = async () => {
	const timestamp = Math.round(new Date().getTime() / 1000);
	const folderName = process.env.CLOUDINARY_FOLDER_NAME;
	const signature = await cloudinary.utils.api_sign_request(
		{
			timestamp,
			folder: folderName,
		},
		process.env.CLOUDINARY_SECRET
	);

	return { timestamp, signature, folderName };
};
