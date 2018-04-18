function responseSuccess (res, body = {}, statusCode = 200) {
  return res.status(statusCode).json(body)
}

function responseError (res, body, statusCode = 400) {
  return responseSuccess(res, body, statusCode)
}

module.exports = {
  responseSuccess, responseError
}