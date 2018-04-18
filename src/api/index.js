const express = require('express')
const router = express.Router()

require('./quotes')(router)

module.exports = router