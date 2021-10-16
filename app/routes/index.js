const express = require('express')
const { root } = require('../controllers/root')
const { notFound } = require('../controllers/notfound')
const { validateReqBody } = require('../controllers/ticket') 

const router = express.Router()

// Routes
router.get('/', root)
router.post('/ticket', function (req,res) {
    validateReqBody(req)
})

// Fall Through Route
router.use(notFound)

module.exports = router