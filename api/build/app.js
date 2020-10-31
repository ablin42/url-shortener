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
require("dotenv").config();
app.use(express_1.default.static("../app/build"));
if (process.env.ENVIRONMENT === "prod")
    app.use(function (req, res, next) {
        if (req.headers.host === "makeshrt.herokuapp.com")
            return res.status(301).redirect("http://" + process.env.HOST + req.url);
        else
            return next();
    });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
db_1.default();
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));
app.get("*", (req, res) => {
    try {
        console.log("404 route");
        return res.sendFile(path.join(__dirname, "../../app/build/index.html"));
    }
    catch (err) {
        console.log("404 PAGE ERROR:", err.message);
        return res.sendFile(path.join(__dirname, "../../app/build/index.html"));
    }
});
const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
//# sourceMappingURL=app.js.map