const BaseController = require('../base.controller')
const QuotesModel = require('./quotes.model')

class QuotesController extends BaseController {
  constructor () {
    super()
    this.model = new QuotesModel()
  }

  get (req, res) {
    return this.model.get()
    .then(data => {
      (data.Count) ? this.success(res,{'quote': data.Items[0].quote, 'author': data.Items[0].author}) : this.success(res,{"res": "no quotes"})
    })
    .catch(err => this.error(res, err))
  }

  post(req, res) {
    return this.model.post(req.body)
    .then(data => this.success(res, data))
    .catch(err => this.error(res, err))
  }

    query_attr(req, res) {
    return this.model.scan_attr(req.body)
    .then(data => this.success(res, data))
    .catch(err => this.error(res, err))
  }

  delete(req, res) {
    return this.model.pop(req.body)
    .then(data => this.success(res, data))
    .catch(err => this.error(res, err))
  }
}

module.exports = QuotesController