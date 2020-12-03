import express from "express";
const app = express();
import connectDB from "./config/db";
import * as bodyParser from "body-parser";
import * as path from "path";
import expressSanitizer from "express-sanitizer";
import sanitize from "mongo-sanitize";
import cors from "cors";
import helmet from "helmet";
require("dotenv").config();

app.use(express.static("../app/build"));

// Domain redirection
if (process.env.ENVIRONMENT === "prod")
  app.use(function (req, res, next) {
    if (req.headers.host === "makeshrt.herokuapp.com")
      return res.status(301).redirect("http://" + process.env.HOST + req.url);
    else return next();
  });

// Connect to db
connectDB();

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

app.use(cors());

//Helmet
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies({}));
app.use(helmet.referrerPolicy({ policy: "same-origin" }));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      reportUri: "/report-violation",
      defaultSrc: ["'self'"],
      connectSrc: ["'self'"],
      styleSrc: [
        "'self'",
        "kit-free.fontawesome.com",
        "cdnjs.cloudflare.com",
        "fonts.googleapis.com",
      ],
      fontSrc: [
        "'self'",
        "fonts.googleapis.com",
        "kit-free.fontawesome.com",
        "fonts.gstatic.com",
        "cdnjs.cloudflare.com",
      ],
      scriptSrc: [
        "'self'",
        "kit.fontawesome.com",
        "'sha256-p3p0cAIGaZ6GV1duF9bel8DJurtOsceM8NQ65yFnL74='",
        "'sha256-p3p0cAIGaZ6GV1duF9bel8DJurtOsceM8NQ65yFnL74='",
      ],
      imgSrc: ["'self'", "data:"],
    },
    reportOnly: false,
  })
);

app.post("/report-violation", (req, res) => {
  if (req.body) {
    console.log("CSP Violation: ", req.ip, req.body);
  } else {
    console.log("CSP Violation: No data received!", req.ip);
  }

  res.status(204).end();
});

// Define routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

app.get("*", (req, res) => {
  try {
    return res.sendFile(path.join(__dirname, "../../app/build/index.html"));
  } catch (err) {
    console.log("Index route error", err.message);
    return res.status(500).json({
      error: true,
      message: "Service is temporarily down, come again later !",
    });
  }
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
