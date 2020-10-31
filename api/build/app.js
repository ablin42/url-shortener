"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const db_1 = __importDefault(require("./config/db"));
const bodyParser = __importStar(require("body-parser"));
const path = __importStar(require("path"));
const express_sanitizer_1 = __importDefault(require("express-sanitizer"));
const mongo_sanitize_1 = __importDefault(require("mongo-sanitize"));
const helmet_1 = __importDefault(require("helmet"));
require("dotenv").config();
app.use(express_1.default.static("../app/build"));
if (process.env.ENVIRONMENT === "prod")
    app.use(function (req, res, next) {
        if (req.headers.host === "makeshrt.herokuapp.com")
            return res.status(301).redirect("http://" + process.env.HOST + req.url);
        else
            return next();
    });
db_1.default();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express_sanitizer_1.default());
app.use((req, res, next) => {
    req.body = mongo_sanitize_1.default(req.body);
    req.query = mongo_sanitize_1.default(req.query);
    next();
});
app.use(helmet_1.default());
app.use(helmet_1.default.permittedCrossDomainPolicies({}));
app.use(helmet_1.default.referrerPolicy({ policy: "same-origin" }));
app.use(helmet_1.default.contentSecurityPolicy({
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
        fontSrc: ["'self'", "fonts.googleapis.com", "kit-free.fontawesome.com", "fonts.gstatic.com", "cdnjs.cloudflare.com"],
        scriptSrc: [
            "'self'",
            "kit.fontawesome.com",
            "'sha256-p3p0cAIGaZ6GV1duF9bel8DJurtOsceM8NQ65yFnL74='",
            "'sha256-p3p0cAIGaZ6GV1duF9bel8DJurtOsceM8NQ65yFnL74='"
        ],
        imgSrc: ["'self'", "data:"]
    },
    reportOnly: false
}));
app.post("/report-violation", (req, res) => {
    if (req.body) {
        console.log("CSP Violation: ", req.ip, req.body);
    }
    else {
        console.log("CSP Violation: No data received!", req.ip);
    }
    res.status(204).end();
});
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));
app.get("*", (req, res) => {
    try {
        return res.sendFile(path.join(__dirname, "../../app/build/index.html"));
    }
    catch (err) {
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
//# sourceMappingURL=app.js.map