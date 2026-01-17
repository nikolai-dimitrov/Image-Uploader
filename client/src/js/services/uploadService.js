import { signImage } from "./backendService.js";

// process image -> sign and invoke upload function
const upload = (url, formData, progressBarController) => {
	const xhr = new XMLHttpRequest();

	xhr.open("POST", url);

	xhr.upload.addEventListener("loadstart", (e) => {
		progressBarController.show();
	});

	xhr.upload.addEventListener("progress", (e) => {
		progressBarController.fill();
	});

	xhr.upload.addEventListener("loadend", (e) => {
		// progressBarController.hide();
	});

	xhr.upload.addEventListener("error", (e) => {
		// handle upload related errors
	});

	xhr.addEventListener("load", () => {
		// 	// handle request related errors
		// Invoke showError fn if status < 200 or > 300
		// Invoke showSuccess fn for successfully update
		console.log(xhr.status);
	});

	xhr.send(formData);
};

export const processImageFile = async (file, progressBarController) => {
	try {
		const data = await signImage();
		const url = `http://api.cloudinary.com/v1_1/${data.cloudName}/image/upload`;
		const formData = new FormData();

		// TODO: Use for loop
		formData.append("file", file);
		formData.append("api_key", data.apiKey);
		formData.append("timestamp", data.timestamp);
		formData.append("signature", data.signature);
		formData.append("folder", data.folderName);

		upload(url, formData, progressBarController);
	} catch (error) {
		console.log(error.message);
	}

	// Upload file into cloudinary
};
