const config = require('../config/quotes')
const moment = require('moment')
const _ = require('lodash')
// const Promise = require('bluebird')
// const { getUUID } = require('./helpers/utils')

const AWS = config.AWS
const log = config.log
const db = new AWS.DynamoDB.DocumentClient()

class BaseModel {
  constructor() {
    this.config = config
    this.log = log
    this.tableName = this.config.db.tables.quotes.name
    this.partitionKey = this.config.db.tables.quotes.partition
    this.sortKey = this.config.db.tables.quotes.sort
  }

  put (data) {
    const added_date = moment().utc().format()
    const params = {
      TableName: this.tableName,
      Item: { 'quote': data.quote, 'author': data.author, 'added_date': added_date },
      ConditionExpression: "#quote <> :quote",
      ExpressionAttributeNames: { "#quote": "quote" },
      ExpressionAttributeValues: { ":quote": data.quote }
    }
    this.log.debug(`BaseModel.put(): params: ${JSON.stringify(params)}`)

    return db.put(params).promise()
  }

  scan (conditions) {
    const params = _.extend({TableName: this.tableName}, conditions)

    this.log.debug(`BaseModel.scan(): params: ${JSON.stringify(params)}`)

    return db.scan(params).promise()
  }

  delete (conditions) {
    const params = _.extend({TableName: this.tableName}, conditions)

    this.log.debug(`BaseModel.delete(): params: ${JSON.stringify(params)}`)

    return db.delete(params).promise()
  }
}

module.exports = BaseModel