require('dotenv').config()
const awsServerlessExpress = require('aws-serverless-express')
const app = require('./src/app')

const server = awsServerlessExpress.createServer(app);

//main handler for API endpoints:
exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
