const express = require("express")

const { root } = require("../controllers/root")
const { notFound } = require("../controllers/notfound")
const { getScoreData } = require("../controllers/ticket/ticket")
const { validateReqBody } = require("../controllers/ticket/ticketValidation")

const router = express.Router();

// Routes
router.get("/", root);
router.post("/ticket", async function (req, res) {
  try {
    validateReqBody(req)

    const ticketsWithScoreData = await getScoreData(
      req.body.drawDate,
      req.body.tickets
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
