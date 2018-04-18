const BaseModel = require('../base.model')
const { getUUID } = require('../helpers/utils')

class QuotesModel extends BaseModel {
  // get random item
  get() {
    const lastKeyEvaluated = {
      'key': getUUID()
    }

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
}

module.exports = QuotesModel