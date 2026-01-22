import { dom } from "./domElements.js";
import { initDragDropImage } from "./dragDropImage.js";
import { processImageFile } from "./services/uploadService.js";
import { validateImageSize, validateFileType } from "./validators.js";
import {
	createProgressBarController,
	showSuccessMessage,
	showErrorMessage,
	clearFeedback,
} from "./utilsUi.js";

const fileState = {
	file: null,
	isUploading: false,
	isServerError: false,
};

const setSelectedImage = (file) => {
	// Clear feedback message when user put image in preview
	clearFeedback(dom.messageParagraphElement, dom.imageUrlElement);

	if (!file) {
		return;
	}

	const [isTypeValid, typeErrorMsg] = validateFileType(file, "image");

	if (!isTypeValid) {
		alert(typeErrorMsg);
		return;
	}

	// Show image preview before size validation to show the user which image cannot upload for more clarity.
	showImagePreview(file);

	const [isSizeValid, sizeErrorMsg] = validateImageSize(file, 4);

	if (!isSizeValid) {
		dom.uploadBtn.disabled = true;
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
	dom.imagePreviewElement.classList.add("inPreview");

	dom.imageElement.classList.replace("hidden", "visible");
	const img = URL.createObjectURL(file);
	dom.imageElement.src = img;
};

const closeImagePreview = () => {
	if (dom.imagePreviewElement.classList.contains("inPreview")) {
		dom.imagePreviewElement.classList.remove("inPreview");
	}

	dom.imageElement.src = "";
	dom.imageElement.classList.replace("visible", "hidden");

	// After a image is selected and removed, the same photo cannot be selected again without resetting the input value.
	dom.inputImageElement.value = "";
};

const removeImageBtnHandler = () => {
	if (fileState.isServerError) {
		clearFeedback(dom.messageParagraphElement, dom.imageUrlElement);
		fileState["isServerError"] = false;
	}

	closeImagePreview();
	fileState["file"] = null;

	// Enable upload btn in case of last image in preview was more than allowed MB.
	if (dom.uploadBtn.disabled == true) {
		dom.uploadBtn.disabled = false;
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
		const { url } = await processImageFile(
			fileState,
			progressBarController,
			setIsUploading
		);

		showSuccessMessage(
			dom.messageParagraphElement,
			dom.imageUrlElement,
			url
		);
		closeImagePreview();
		fileState["file"] = null;
	} catch (error) {
		fileState["isServerError"] = true;
		showErrorMessage(dom.messageParagraphElement, error.message);
	}
};

dom.uploadIconContainerElement.addEventListener("click", () =>
	dom.inputImageElement.click()
);

initDragDropImage(setSelectedImage, dom.dropZoneDivElement);
const progressBarController = createProgressBarController(
	dom.progressBarElement
);

dom.inputImageElement.addEventListener("change", imageChangeHandler);
dom.uploadBtn.addEventListener("click", uploadBtnClickHandler);
dom.removeBtn.addEventListener("click", removeImageBtnHandler);
