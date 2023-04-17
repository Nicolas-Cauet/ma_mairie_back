/**
 * The object allows you to create
 * a customize error and send it back to the front end
 * @type {Object}
 * @namespace handleError
 * @export handleError
 * @param {Object} message String
 * @param {Object} status Number
 */
function handleError(message, status = 500) {
  this.message = message;
  this.status = status;
}

module.exports = handleError;
