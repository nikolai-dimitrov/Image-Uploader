export const initDragDropImage = (setSelectedImage, dropZoneElement) => {
	const eventHandlers = {
		dragenter: (e) => {
			e.preventDefault();
		},
		dragover: (e) => {
			e.preventDefault();
			dropZoneElement.classList.add("dragover");
		},
		dragleave: (e) => {
			e.preventDefault();
			dropZoneElement.classList.remove("dragover");
		},
		drop: (e) => {
			e.preventDefault();
			dropZoneElement.classList.remove("dragover");
			const file = e.dataTransfer.files[0];

			setSelectedImage(file);
		},
	};

	for (const eventName in eventHandlers) {
		const callbackFn = eventHandlers[eventName];
		dropZoneElement.addEventListener(eventName, callbackFn);
	}
};

console.log("init");
