const express = require("express");
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config();

app = express();

async function startApp(app) {
	try {
		app.use(cors());
		app.use(routes);

		app.listen(3000, () => {
			console.log(`Listening on port ${3000}`);
		});
	} catch (error) {
		console.log(error);
	}
}

startApp(app);
