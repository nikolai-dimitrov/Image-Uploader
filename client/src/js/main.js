import { initDragDropImage } from "./dragDropImage.js";
// import { processImageFile } from "./upload.js";
import { validateImageSize, validateFileType } from "./validators.js";

const dropZoneDivElement = document.querySelector(".dropZone");
const uploadIconContainerElement = document.querySelector(
	".dropZone .iconContainer"
);
const inputImageElement = document.querySelector(".dropZone input");
const imagePreviewElement = document.querySelector(".dropZone .imagePreview");
const imageElement = document.querySelector(".dropZone .imagePreview img");

const uploadBtn = document.querySelector(".actionsContainer .uploadBtn");
const removeBtn = document.querySelector(".actionsContainer .removeBtn");

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

	// processImageFile(file);
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

	// Enable upload btn in case of last image in preview was with more than 2MB size.
	if (uploadBtn.disabled == true) {
		uploadBtn.disabled = false;
	}
};

const imageChangeHandler = (e) => {
	const file = e.target.files[0];
	setSelectedImage(file);
};

uploadIconContainerElement.addEventListener("click", () =>
	inputImageElement.click()
);

initDragDropImage(setSelectedImage, dropZoneDivElement);

inputImageElement.addEventListener("change", imageChangeHandler);
removeBtn.addEventListener("click", removeImageBtnHandler);
