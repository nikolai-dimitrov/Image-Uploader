const imageForm = document.getElementById("imageForm");
const imageInput = document.querySelector("#imageForm input");
const submitBtn = document.querySelector("#imageForm button");
const imageElement = document.querySelector(".imagePreview img");

const showImagePreview = (file) => {
	// TODO: Display block class to div image container
	const img = URL.createObjectURL(file);
	imageElement.src = img;
};

const clearImagePreview = () => {
	// TODO: Display none class to div image container
	imageElement.src = "";
};

const handleImageInputChange = (e) => {
	const file = imageInput.files[0];

	if (!file) {
		clearImagePreview();
		// Enable upload button in case previously chosen image was more than 2MB and instead of the user choosing another image, he just closes the window.
		// Prevents upload button remain disabled when image is canceled.
		submitBtn.disabled = false;
		return;
	}

	// Show image preview before size validation to show the user  which image cannot upload for more clarity.
	showImagePreview(file);
    
	if (file.size > Math.pow(1024, 2) * 2) {
		alert("Cannot upload this file size is over 2MB.");
		submitBtn.disabled = true;
		return;
	}

	submitBtn.disabled = false;
};

imageInput.addEventListener("change", handleImageInputChange);
