const express = require('express')
const routes = require('./routes')

// Create Express App
const app = express()

app.use(express.json({type: '*/*'}));

// Routes
app.use('/', routes)

module.exports = app
