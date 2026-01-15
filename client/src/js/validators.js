export const validateImageSize = (file, maxSizeMB) => {
	let isValid = true,
		errorMsg;

	if (file.size > Math.pow(1024, 2) * maxSizeMB) {
		isValid = false;
		errorMsg = `Cannot upload this file size is over ${maxSizeMB}MB.`;
	}

	return [isValid, errorMsg];
};

export const validateFileType = (file, fileType) => {
	let isValid = true,
		errorMsg;

	if (!file.type.startsWith(`${fileType}/`)) {
		isValid = false;
		errorMsg = `File type is not of type: ${fileType}`;
	}

	return [isValid, errorMsg];
};
