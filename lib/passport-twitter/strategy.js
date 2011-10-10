/**
 * Module dependencies.
 */
var util = require('util')
  , OAuthStrategy = require("passport-oauth").OAuthStrategy;


/**
 * `Strategy` constructor.
 *
 * @api public
 */
function Strategy(options, validate) {
  options = options || {};
  options.requestTokenURL = options.requestTokenURL || 'https://twitter.com/oauth/request_token';
  options.accessTokenURL = options.accessTokenURL || 'https://twitter.com/oauth/access_token';
  options.userAuthorizationURL = options.userAuthorizationURL || 'https://twitter.com/oauth/authenticate';
  
  OAuthStrategy.call(this, options, validate);
  this.name = 'twitter';
}

/**
 * Inherit from `OAuthStrategy`.
 */
util.inherits(Strategy, OAuthStrategy);


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
