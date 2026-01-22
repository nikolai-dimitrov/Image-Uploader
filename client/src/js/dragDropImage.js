export const initDragDropImage = (setSelectedImage, dropZone) => {
	const eventHandlers = {
		dragenter: (e) => {
			e.preventDefault();
		},
		dragover: (e) => {
			e.preventDefault();
			dropZone.classList.add("dragover");
		},
		dragleave: (e) => {
			e.preventDefault();
			dropZone.classList.remove("dragover");
		},
		drop: (e) => {
			e.preventDefault();
			dropZone.classList.remove("dragover");
			const file = e.dataTransfer.files[0];

			setSelectedImage(file);
		},
	};

	for (const eventName in eventHandlers) {
		const callbackFn = eventHandlers[eventName];
		dropZone.addEventListener(eventName, callbackFn);
	}
};