export const signImage = async () => {
	try {
		const response = await fetch(
			"http://localhost:3000/cloudinary/generate-signature"
		);

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message);
		}

		return data;
	} catch (error) {
		throw error
	}
};
