const express = require("express");
const app = express();
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

if (process.env.ENVIRONMENT === "prod")
	app.use(function (req, res, next) {
		if (req.headers.host === "makeshrt.herokuapp.com") return res.status(301).redirect("http://" + process.env.HOST + req.url);
		else return next();
	});

// Middleware
//-- Body parser --//
// Parse app/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse app/json
app.use(bodyParser.json());

// Connect to db
connectDB();

// Define routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

app.get("*", (req, res) => {
	try {
		let obj = {
			active: "404"
		};
		res.status(404).render("404", obj);
	} catch (err) {
		console.log("404 PAGE ERROR:", err.message);
		res.status(500).render("views/index", { active: "Home" });
	}
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));

//v=Z57566JBaZQ
