const express = require("express");

app = express();

async function startApp(app) {
	try {

		app.listen(3000, () => {
			console.log(`Listening on port ${3000}`);
		});
	} catch (error) {
		console.log(error);
	}
}

startApp(app);