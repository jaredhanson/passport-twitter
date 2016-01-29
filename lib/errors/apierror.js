/**
 * `APIError` error.
 *
 * References:
 *   - https://dev.twitter.com/overview/api/response-codes
 *
 * @constructor
 * @param {string} [message]
 * @param {number} [code]
 * @access public
 */
function APIError(message, code) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'APIError';
  this.message = message;
  this.code = code;
  this.status = 500;
}

// Inherit from `Error`.
APIError.prototype.__proto__ = Error.prototype;


// Expose constructor.
module.exports = APIError;
