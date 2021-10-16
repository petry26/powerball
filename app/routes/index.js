const express = require('express')

const { root } = require('../controllers/root')
const { notFound } = require('../controllers/notfound')
const { validateReqBody, calculateScore } = require('../controllers/ticket') 
const { getLoterryResults} = require('../controllers/resultsAPI')

// Globals
const globalConst = require('../utils/globalConst')


const router = express.Router()

// Routes
router.get('/', root)
router.post('/ticket', async function (req,res) {
    
    validateReqBody(req)
    
    const loterryResults = await getLoterryResults(globalConst.DATA_GOV_URL) //TODOX rename resultsJson

    calculateScore(req.body, loterryResults)


})

// Fall Through Route
router.use(notFound)

module.exports = router