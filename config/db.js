const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_CONNECTION, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log("Connected to database...");
	} catch (err) {
		console.error("Error while connecting to database:", err.message);
		process.exit(1); /////
	}
};

module.exports = connectDB;
