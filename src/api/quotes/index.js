module.exports = (router) => {
  const Controller = require('./quotes.controller')
  const controller = new Controller()

  router.get('/quote', (req, res) => controller.get(req, res)) 
  router.post('/quote', (req, res) => controller.post(req, res))
  router.post('/scanquotes', (req, res) => controller.query_attr(req, res))

  return router
}