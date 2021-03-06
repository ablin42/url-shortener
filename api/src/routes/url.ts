import * as express from "express";
import { validationResult } from "express-validator";
const router = express.Router();
import * as validUrl from "valid-url";
import shortid from "shortid";
import sanitize from "mongo-sanitize";
require("dotenv").config();

const utils = require("../utils");
import Url from "../models/Url";

const { vUrl } = require("../validators/vUrl");

router.post("/auth", async (req, res) => {
  try {
    const { password } = req.body;
    if (password === process.env.PASSWORD) return res.status(200).send(true);
    return res.status(200).send({ error: true, message: "Unauthorized" });
  } catch (err) {
    console.log("Auth route error", err.message);
    return res.status(500).json({
      error: true,
      message: "Service is temporarily down, come again later !",
    });
  }
});

router.get("/list/:pass", async (req, res) => {
  try {
    const pass = req.params.pass;
    if (pass !== process.env.PASSWORD) throw new Error("Please don't");

    const [err, url] = await utils.promise(Url.find());
    if (err) throw new Error("An error occured while looking for URLs");
    if (url) return res.status(200).json(url);
    else return res.status(200).json({ error: true, message: "No URLs found" });
  } catch (err) {
    console.log("List route error", err.message);
    return res.status(500).json({
      error: true,
      message: "Service is temporarily down, come again later !",
    });
  }
});

router.post("/delete/:urlCode/:pass", async (req, res) => {
  try {
    const pass = req.params.pass;
    if (pass !== process.env.PASSWORD) throw new Error("Please don't");
    const [err, url] = await utils.promise(
      Url.findOneAndDelete({ urlCode: req.params.urlCode })
    );
    if (err) throw new Error("An error occured while trying to delete URL");
    if (url) return res.status(200).json(url);
    else return res.status(200).json({ error: true, message: "No URLs found" });
  } catch (err) {
    console.log("Delete route error", err.message);
    return res.status(500).json({
      error: true,
      message: "Service is temporarily down, come again later !",
    });
  }
});

// @route   POST /api/url/shorten
// @desc    Create short URL from posted long URL /// Send short URL if long URL already exist in DB
router.post(
  "/shorten",
  vUrl,
  async (req: express.Request, res: express.Response) => {
    try {
      let errors = await utils.checkValidationResult(validationResult(req));
      if (errors.length > 0) throw new Error("Incorrect URL format");

      const { longUrl } = req.body;
      const baseUrl = process.env.HOST;
      const urlCode = shortid.generate();

      if (!validUrl.isWebUri("http://" + baseUrl))
        return res
          .status(401)
          .json({ error: true, message: "Invalid base URL" });

      if (validUrl.isWebUri(longUrl)) {
        var [err, url] = await utils.promise(Url.findOne({ longUrl }));
        if (err) throw new Error("An error occured while looking for your URL");

        if (url) {
          return res.status(200).json(url);
        } else {
          const shortUrl = baseUrl + "/" + urlCode;
          let url = new Url({ longUrl, shortUrl, urlCode });

          [err, url] = await utils.promise(url.save());
          if (err)
            throw new Error("An error occured while creating your short URL");

          return res.status(200).json(url);
        }
      } else
        return res
          .status(200)
          .json({ error: true, message: "Invalid long URL" });
    } catch (err) {
      console.log("Shorten api error:", err.message);
      return res.status(200).json({ error: true, message: err.message });
    }
  }
);

// @route   GET
// @desc   Return object URL corresponding to URLCode
router.get("/:urlCode", async (req, res) => {
  try {
    let errors = await utils.checkValidationResult(validationResult(req));
    if (errors.length > 0) throw new Error("Incorrect Code");

    let { urlCode } = sanitize(req.params);

    var [err, url] = await utils.promise(Url.findOne({ urlCode }));
    if (err) throw new Error("An error occured while looking for your URL");
    if (url) return res.status(200).json(url);
    else return res.status(200).json({ error: true, message: "No URL found" });
  } catch (err) {
    console.log("Get URL API error:", err.message);
    return res.status(200).json({ error: true, message: err.message });
  }
});

module.exports = router;
