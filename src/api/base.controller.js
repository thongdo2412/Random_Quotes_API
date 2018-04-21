const { responseSuccess, responseError } = require('./helpers/responses')
const log = require('../config/quotes').log

class BaseController {
  constructor() {
    this.log = log
  }

  success(req, body) {
    return responseSuccess(req, body)
  }

  error(req, body) {
    this.log.error(body)
    return responseError(req, body)
  }
}

module.exports = BaseController
