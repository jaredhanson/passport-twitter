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
function Strategy(options, verify) {
  options = options || {};
  options.requestTokenURL = options.requestTokenURL || 'https://twitter.com/oauth/request_token';
  options.accessTokenURL = options.accessTokenURL || 'https://twitter.com/oauth/access_token';
  options.userAuthorizationURL = options.userAuthorizationURL || 'https://twitter.com/oauth/authenticate';
  options.sessionKey = options.sessionKey || 'oauth:twitter';
  
  OAuthStrategy.call(this, options, verify);
  this.name = 'twitter';
}

/**
 * Inherit from `OAuthStrategy`.
 */
util.inherits(Strategy, OAuthStrategy);


Strategy.prototype.authenticate = function(req) {
  // When a user denies authorization on Twitter, they are presented with a link
  // to return to the application in the following format (where xxx is the
  // value of the request token):
  //
  //     http://www.example.com/auth/twitter/callback?denied=xxx
  //
  // Following the link back to the application is interpreted as an
  // authentication failure.
  if (req.query && req.query.denied) {
    return this.fail();
  }
  
  // Call the base class for standard OAuth authentication.
  OAuthStrategy.prototype.authenticate.call(this, req);
}


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
