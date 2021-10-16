const express = require("express")

const { root } = require("../controllers/root")
const { notFound } = require("../controllers/notfound")
const { validateReqBody, getScoreData } = require("../controllers/ticket")
const { getLotteryResults } = require("../controllers/lotteryResultsAPI")

// Globals
const globalConst = require("../utils/globalConst")

const router = express.Router();

// Routes
router.get("/", root);
router.post("/ticket", async function (req, res) {
  try {
    validateReqBody(req);

    const loterryResults = await getLotteryResults(globalConst.DATA_GOV_URL)

    const ticketsWithScoreData = getScoreData(
      req.body.drawDate,
      req.body.lotteryNumbers,
      loterryResults
    )

    res.json(ticketsWithScoreData)
  } catch (error) {
    console.log(error)
    res.status(error.status ? error.status : 500).send(error.message ? error.message : 'unknown error')
  }
});

// Fall Through Route
router.use(notFound);

module.exports = router
