const config = require('../config/quotes')
const AWS = config.AWS
const log = config.log
const moment = require('moment')
const _ = require('lodash')
const db = new AWS.DynamoDB.DocumentClient()
const Promise = require('bluebird')
const { getUUID } = require('./helpers/utils')

class BaseModel {
  constructor () {
    this.config = config
    this.log = log
    this.tableName = this.config.db.tables.quotes.name
    this.partitionKey = this.config.db.tables.quotes.partition
    // this.sortKey = this.config.db.tables.quotes.sort
  }

  put (data) {
    const key = getUUID()
    const added_date = moment().utc().format()
    const params = {
      TableName: this.tableName,
      Item: _.extend({'key': key, 'added_date': added_date}, data)
    }
    console.log(params)
    this.log.debug(`BaseModel.put(): params: ${JSON.stringify(params)}`)

    return db.put(params).promise()
  }

  scan (conditions) {
    const params = _.extend({TableName: this.tableName}, conditions)

    this.log.debug(`BaseModel.scan(): params: ${JSON.stringify(params)}`)

    return db.scan(params).promise()
  }

}

module.exports = BaseModel