import { signImage } from "./backendService.js";
export const processImageFile = async (file) => {
	const data = await signImage();

	const formData = new FormData();

	formData.append("file", file);
	formData.append("api_key", data.apiKey);
	formData.append("timestamp", data.timestamp);
	formData.append("signature", data.signature);
	formData.append("folder", data.folderName);

	fetch(`http://api.cloudinary.com/v1_1/${data.cloudName}/image/upload`, {
		method: "POST",
		body: formData,
	});
	// Invoke sign fn from api
	// Upload file into cloudinary
};
