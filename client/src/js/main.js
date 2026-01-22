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
	clearFeedback(dom.feedbackMessage, dom.feedbackLink);

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
	dom.previewContainer.classList.add("inPreview");

	dom.imagePreview.classList.replace("hidden", "visible");
	const img = URL.createObjectURL(file);
	dom.imagePreview.src = img;
};

const closeImagePreview = () => {
	if (dom.previewContainer.classList.contains("inPreview")) {
		dom.previewContainer.classList.remove("inPreview");
	}

	dom.imagePreview.src = "";
	dom.imagePreview.classList.replace("visible", "hidden");

	// After a image is selected and removed, the same photo cannot be selected again without resetting the input value.
	dom.imageInput.value = "";
};

const removeImageBtnHandler = () => {
	if (fileState.isServerError) {
		clearFeedback(dom.feedbackMessage, dom.feedbackLink);
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
			dom.feedbackMessage,
			dom.feedbackLink,
			url
		);
		closeImagePreview();
		fileState["file"] = null;
	} catch (error) {
		fileState["isServerError"] = true;
		showErrorMessage(dom.feedbackMessage, error.message);
	}
};

dom.uploadIconContainer.addEventListener("click", () =>
	dom.imageInput.click()
);

initDragDropImage(setSelectedImage, dom.dropZone);
const progressBarController = createProgressBarController(
	dom.progressBar
);

dom.imageInput.addEventListener("change", imageChangeHandler);
dom.uploadBtn.addEventListener("click", uploadBtnClickHandler);
dom.removeBtn.addEventListener("click", removeImageBtnHandler);
