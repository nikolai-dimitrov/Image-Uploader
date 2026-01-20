export const initProgressBarController = (progressBarElement) => {
	return {
		show: () => {
			progressBarElement.classList.replace("hidden", "visible");
			progressBarElement.value = 0;
		},

		fill: (percentLoaded) => {
			progressBarElement.value = percentLoaded;
		},

		hide: () => {
			progressBarElement.classList.replace("visible", "hidden");
			progressBarElement.value = 0;
		},
	};
};

export const showSuccessMessage = (paragraphEl, anchorEl, url) => {
	paragraphEl.textContent = "Image is uploaded successfully!";

	anchorEl.href = url;
	anchorEl.textContent = url;

	paragraphEl.classList.replace("hidden", "visible");
};

export const showErrorMessage = () => {
	//
};
