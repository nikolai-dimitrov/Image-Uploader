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
			setTimeout(() => {
				progressBarElement.classList.replace("visible", "hidden");
				progressBarElement.value = 0;
			}, 3000);
		},
	};
};


