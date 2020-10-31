import express from "express";
const app = express();
import connectDB from "./config/db";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as expressSanitizer from "express-sanitizer";
import sanitize from "mongo-sanitize";
require("dotenv").config();

app.use(express.static("../app/build"));

// Domain redirection
if (process.env.ENVIRONMENT === "prod")
  app.use(function (req, res, next) {
    if (req.headers.host === "makeshrt.herokuapp.com")
      return res.status(301).redirect("http://" + process.env.HOST + req.url);
    else return next();
  });

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sanitize body and query params
app.use(expressSanitizer());
app.use((req, res, next) => {
	req.body = sanitize(req.body);
	req.query = sanitize(req.query);

	next();
});

// Connect to db
connectDB();

// Define routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

app.get("*", (req, res) => {
  try {
     console.log("404 route")
    return res.sendFile(path.join(__dirname, "../../app/build/index.html"));
  } catch (err) {
    console.log("404 PAGE ERROR:", err.message);
    return res.sendFile(path.join(__dirname, "../../app/build/index.html"));
  }
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
