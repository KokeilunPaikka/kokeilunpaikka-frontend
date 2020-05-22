export default class ApiError extends Error {
  generalError = false

  constructor(response, json) {
    const message = response.statusText
    super(message)

    this.name = this.constructor.name
    this.status = response.status
    this.statusText = response.statusText
    this.messages = json

    if (json.non_field_errors) {
      this.generalError = true
    }

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = new Error(message).stack
    }
  }
}
