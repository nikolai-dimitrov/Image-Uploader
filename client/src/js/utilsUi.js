export const createProgressBarController = (progressBar) => {
	return {
		show: () => {
			progressBar.classList.replace("hidden", "visible");
			progressBar.value = 0;
		},

		fill: (percentLoaded) => {
			progressBar.value = percentLoaded;
		},

		hide: () => {
			progressBar.classList.replace("visible", "hidden");
			progressBar.value = 0;
		},
	};
};

export const showSuccessMessage = (feedbackMessage, feedbackLink, url) => {
	feedbackMessage.textContent = "Image is uploaded successfully!";

	feedbackLink.href = url;
	feedbackLink.textContent = url;

	feedbackMessage.classList.replace("hidden", "visible");
};

export const showErrorMessage = (feedbackMessage, errorMessage) => {
	feedbackMessage.textContent = errorMessage;
	feedbackMessage.classList.add("error");

	feedbackMessage.classList.replace("hidden", "visible");
};

export const clearFeedback = (feedbackMessage, feedbackLink) => {
	feedbackMessage.textContent = "";
	
	if (feedbackMessage.classList.contains("error")) {
		feedbackMessage.classList.remove("error");
	}

	feedbackLink.removeAttribute("href");
	feedbackLink.textContent = "";

	feedbackMessage.classList.replace("visible", "hidden");
};
