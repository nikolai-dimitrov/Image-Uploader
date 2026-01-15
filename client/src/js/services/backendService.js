export const signImage = async () => {
	try {
		const response = await fetch(
			"http://localhost:3000/cloudinary/generate-signature"
		);

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const data = await response.json();

		return data;
	} catch (error) {
        // TODO: Implement error handling and fallback ui
		console.log(error.message);
	}
};
