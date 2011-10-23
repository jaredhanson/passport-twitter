/**
 * Module dependencies.
 */
var util = require('util')
  , OAuthStrategy = require('passport-oauth').OAuthStrategy;


/**
 * `Strategy` constructor.
 *
 * The Twitter authentication strategy authenticates requests by delegating to
 * Twitter using the OAuth protocol.
 *
 * Applications must supply a `verify` callback which accepts a `token`,
 * `tokenSecret` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `consumerKey`     identifies client to Twitter
 *   - `consumerSecret`  secret used to establish ownership of the consumer key
 *   - `callbackURL`     URL to which Twitter will redirect the user after obtaining authorization
 *
 * Examples:
 *
 *     passport.use(new TwitterStrategy({
 *         consumerKey: '123-456-789',
 *         consumerSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/twitter/callback'
 *       },
 *       function(token, tokenSecret, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
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


/**
 * Authenticate request by delegating to Twitter using OAuth.
 *
 * @param {Object} req
 * @api protected
 */
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
 * Retrieve user profile from Twitter.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `id`        (equivalent to `user_id`)
 *   - `username`  (equivalent to `screen_name`)
 *
 * Note that because Twitter supplies basic profile information in query
 * parameters when redirecting back to the application, loading of Twitter
 * profiles *does not* result in an additional HTTP request.
 *
 * @param {String} token
 * @param {String} tokenSecret
 * @param {Object} params
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(token, tokenSecret, params, done) {
  var profile = { provider: 'twitter' };
  profile.id = params.user_id;
  profile.username = params.screen_name;
  
  return done(null, profile);
}


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
