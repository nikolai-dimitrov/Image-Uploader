import { initDragDropImage } from "./dragDropImage.js";
import { processImageFile } from "./services/uploadService.js";
import { validateImageSize, validateFileType } from "./validators.js";
import { initProgressBarController } from "./utilsUi.js";

const dropZoneDivElement = document.querySelector(".dropZone");
const uploadIconContainerElement = document.querySelector(
	".dropZone .iconContainer"
);
const inputImageElement = document.querySelector(".dropZone input");
const imagePreviewElement = document.querySelector(".dropZone .imagePreview");
const imageElement = document.querySelector(".dropZone .imagePreview img");

const messageParagraph = document.querySelector(".informationContainer p");

const progressBarElement = document.querySelector(
	".actionsContainer .progressBar"
);

const uploadBtn = document.querySelector(".actionsContainer .uploadBtn");
const removeBtn = document.querySelector(".actionsContainer .removeBtn");

const fileState = {
	file: null,
	isUploading: false,
};

const progressBarController = initProgressBarController(progressBarElement);
const setSelectedImage = (file) => {
	if (!file) {
		return;
	}

	const [isTypeValid, typeErrorMsg] = validateFileType(file, "image");

	if (!isTypeValid) {
		alert(typeErrorMsg);
		return;
	}

	// Show image preview before size validation to show the user  which image cannot upload for more clarity.
	showImagePreview(file);

	const [isSizeValid, sizeErrorMsg] = validateImageSize(file, 4);

	if (!isSizeValid) {
		uploadBtn.disabled = true;
		alert(sizeErrorMsg);
		return;
	}

	fileState["file"] = file;
};

const imageChangeHandler = (e) => {
	const file = e.target.files[0];
	setSelectedImage(file);
};

export const showImagePreview = (file) => {
	imagePreviewElement.classList.add("inPreview");

	imageElement.classList.replace("hidden", "visible");
	const img = URL.createObjectURL(file);
	imageElement.src = img;
};

const closeImagePreview = () => {
	if (imagePreviewElement.classList.contains("inPreview")) {
		imagePreviewElement.classList.remove("inPreview");
	}

	imageElement.src = "";
	imageElement.classList.replace("visible", "hidden");

	// After a image is selected and removed, the same photo cannot be selected again without clearing the input value.
	inputImageElement.value = "";
};

const removeImageBtnHandler = () => {
	closeImagePreview();
	fileState["file"] = null;

	// Enable upload btn in case of last image in preview was with more than 2MB size.
	if (uploadBtn.disabled == true) {
		uploadBtn.disabled = false;
	}
};
const setIsUploading = (isUploading) => {
	fileState.isUploading = isUploading;
};
const uploadBtnClickHandler = async () => {
	const file = fileState["file"];
	if (file == null) {
		alert("Please chose image file to upload.");
		return;
	}

	try {
		if (fileState.isUploading) {
			return;
		}

		const { url, original_filename } = await processImageFile(
			fileState,
			progressBarController,
			setIsUploading
		);
		console.log(fileState.isUploading);
		// Invoke showSuccessFn
	} catch (error) {
		// Invoke showErrorFn
		console.log(error.message);
	}
};

uploadIconContainerElement.addEventListener("click", () =>
	inputImageElement.click()
);

initDragDropImage(setSelectedImage, dropZoneDivElement);

inputImageElement.addEventListener("change", imageChangeHandler);
uploadBtn.addEventListener("click", uploadBtnClickHandler);
removeBtn.addEventListener("click", removeImageBtnHandler);
