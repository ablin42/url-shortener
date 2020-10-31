import express from "express";
const app = express();
import connectDB from "./config/db";
import * as bodyParser from "body-parser";
import * as path from "path";
import expressSanitizer from "express-sanitizer";
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

/*
//Helmet
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies({}));
app.use(helmet.referrerPolicy({ policy: "same-origin" }));
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			reportUri: "/report-violation",
			defaultSrc: ["'self'", "maralbucket.s3.eu-west-3.amazonaws.com", "maralbucket.s3.amazonaws.com"],
			connectSrc: ["'self'", "maralbucket.s3.eu-west-3.amazonaws.com"],
			styleSrc: [
				"'self'",
				"stackpath.bootstrapcdn.com",
				"kit-free.fontawesome.com",
				"fonts.googleapis.com",
				"cdnjs.cloudflare.com",
				"'sha256-ajZEDDdILRcc4lWO9JfCUcWV8WPtU5+drQz8E5IfQ0w='",
				"'sha256-zwHi7E6JKCpD7iSjei/XVSaXpNq1WUE8eBFAiJJV/lA='"
			],
			fontSrc: ["'self'", "fonts.googleapis.com", "kit-free.fontawesome.com", "fonts.gstatic.com"],
			scriptSrc: [
				"'self'",
				"cdnjs.cloudflare.com",
				"www.googletagmanager.com",
				"kit.fontawesome.com",
				"stackpath.bootstrapcdn.com",
				"https://www.google.com/recaptcha/",
				"www.gstatic.com",
				"maps.googleapis.com",
				"maps.gstatic.com",
				"js.stripe.com"
			],
			frameSrc: ["https://www.google.com", "js.stripe.com"],
			imgSrc: ["'self'", "data:", "maps.gstatic.com", "maralbucket.s3.amazonaws.com", "maralbucket.s3.eu-west-3.amazonaws.com"]
		},
		reportOnly: false
	})
);

*/

// Connect to db
connectDB();

// Define routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

app.get("*", (req, res) => {
   try {
    return res.sendFile(path.join(__dirname, "../../app/build/index.html"));
  } catch (err) {
    console.log("Index route error", err.message);
    return res
      .status(500)
      .json({
        error: true,
        message: "Service is temporarily down, come again later !",
      });
  }
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
