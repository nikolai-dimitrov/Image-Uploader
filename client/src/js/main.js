import { dragDropImage } from "./dragDropImage.js";

const dropZoneDivElement = document.querySelector(".dropZone");
const uploadIconContainerElement = document.querySelector(
	".dropZone .iconContainer"
);
const inputImageElement = document.querySelector(".dropZone input");
const imagePreviewElement = document.querySelector(".dropZone .imagePreview");
const imageElement = document.querySelector(".dropZone .imagePreview img");

const uploadBtn = document.querySelector(".actionsContainer .uploadBtn");
const removeBtn = document.querySelector(".actionsContainer .removeBtn");

dragDropImage();

const showImagePreview = (file) => {
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
	inputImageElement.value = "";
};

const processImageFile = (file) => {
	if (!file) {
		return;
	}

	// Show image preview before size validation to show the user  which image cannot upload for more clarity.
	showImagePreview(file);

	if (file.size > Math.pow(1024, 2) * 2) {
		alert("Cannot upload this file size is over 2MB.");
		uploadBtn.disabled = true;
		return;
	}

	uploadBtn.disabled = false;
};

const removeImageBtnHandler = () => {
	closeImagePreview();

	// Enable upload btn in case of last image in preview was with more than 2MB size.
	if (uploadBtn.disabled == true) {
		uploadBtn.disabled = false;
	}
};

const handleImageChange = (e) => {
	const file = e.target.files[0];
	processImageFile(file);
};

uploadIconContainerElement.addEventListener("click", () =>
	inputImageElement.click()
);

inputImageElement.addEventListener("change", handleImageChange);
removeBtn.addEventListener("click", removeImageBtnHandler);
