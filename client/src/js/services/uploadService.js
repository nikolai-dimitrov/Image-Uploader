import { signImage } from "./backendService.js";

const upload = (url, formData, progressBarController) => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		xhr.open("POST", url);

		xhr.upload.addEventListener("loadstart", (e) => {
			progressBarController.show();
		});

		xhr.upload.addEventListener("progress", (e) => {
			const percentLoaded = (e.loaded / e.total) * 100;
			progressBarController.fill(percentLoaded);
		});

		xhr.upload.addEventListener("loadend", (e) => {
			progressBarController.hide();
		});

		xhr.upload.addEventListener("error", (e) => {
			reject(new Error("A problem occurred while uploading. Try again."));
		});

		xhr.addEventListener("load", () => {
			if (xhr.status >= 200 && xhr.status <= 300) {
				const response = JSON.parse(xhr.response);
				resolve(response);
			} else {
				reject(new Error("Uploading failed. Try again. "));
			}
		});

		xhr.addEventListener("error", (e) => {
			reject(new Error("There was a problem connecting to the server."));
		});

		xhr.send(formData);
	});
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

		const response = await upload(url, formData, progressBarController);
		return response
	} catch (error) {
		throw error;
	}
};
