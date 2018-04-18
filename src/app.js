const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const api = require('./api')
const config = require('./config/quotes')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(config.prefix, api)

if (config.inLambda) {
  app.use(awsServerlessExpressMiddleware.eventContext())
} else {
  // running service locally
  app.listen(3000)
}

module.exports = app