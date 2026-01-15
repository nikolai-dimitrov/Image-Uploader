import { signImage } from "./api.js";
export const processImageFile = async (file) => {
	console.log(file);
	const sign = await signImage()
	console.log(sign)
	// Invoke sign fn from api
	// Upload file into cloudinary
};
