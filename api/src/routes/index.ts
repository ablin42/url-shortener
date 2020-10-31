import * as express from "express";
const router = express.Router();
import * as path from "path";

// @route   GET
// @desc    Landing page, shorten url form
router.get("/", async (req, res) => {
  try {
    console.log("get route")
    return res.sendFile(path.join(__dirname, "../../../app/build/index.html"));
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

module.exports = router;
