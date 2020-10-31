import mongoose from "mongoose";
require("dotenv").config();

let CONNECTION_STRING = process.env.DB_CONNECTION;

const connectDB = async () => {
	try {
		if (!CONNECTION_STRING) throw new Error("Database auth not provided");
		await mongoose.connect(CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log("Connected to database...");
	} catch (err) {
		console.log("Error while connecting to database:", err.message);
		process.exit(1);
	}
};

export default connectDB;
