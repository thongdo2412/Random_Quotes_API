const BaseModel = require('../base.model')
const { getUUID } = require('../helpers/utils')
const _ = require('lodash')

class QuotesModel extends BaseModel {
  // get random item
  get() {
    const lastKeyEvaluated = { 'quote': getUUID() }

    const conditions = {
      ExclusiveStartKey: lastKeyEvaluated,
      Limit: 1
    }

    return this.scan(conditions)
  }
  // add new item
  post(data) {
    return this.put(data)
  }

  //scan with filter
  scan_attr(params) {
    const conditions = {
      FilterExpression: "contains( #attr , :str)",
      ExpressionAttributeNames: { "#attr": params.attribute },
      ExpressionAttributeValues: { ":str": params.input_str }
    }

    return this.scan(conditions)    
  }

  pop(key){
    const params = {Key: key}
    return this.delete(params)
  }

}

module.exports = QuotesModel
